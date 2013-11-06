Quizzes = new Meteor.Collection('quizzes');

if (Meteor.isClient) {
  Deps.autorun(function () {
    if (Session.get('_id') != null && Session.get('_id') != '') {
      Session.set('quiz', Quizzes.findOne({ _id: Session.get('_id') }));
    } else {
      Session.set('_id', null);
      Session.set('quiz', null);
    }
  });

  Deps.autorun(function() {
    Session.set('quizzes', Quizzes.find({}, {sort: {createdAt: -1, name: -1}}));
  });
  
  Router.configure({
    layoutTemplate: 'layout'
  });

  Router.map(function () {
      this.route('home', {
      path: '/'
    });
    
    this.route('listQuizzes', {
      path: '/quizzes',
      data: {
        quizzes: function() {
          return Quizzes.find({}, {sort: {createdAt: -1, name: -1}});
        }
      }
    });
    
    this.route('createQuiz', {
      path: '/create'
    });
    
    this.route('startQuiz', {
      path: '/quizzes/:_id/start',
      before: function() {
        Session.set('player_name', null);
        Session.set('_id', this.params._id);
        Session.set('quiz', Quizzes.findOne({ _id: this.params._id }));
        Session.set('countCorrect' , 0);
      },
      data: function() {
        var quiz = Session.get('quiz');
        return {
          _id: quiz._id,
          quiz_name: quiz.name
        }
      }
    });
    
    this.route('question', {
      path: '/quizzes/:_id/question',
      before: function() {
        if (Session.get('player_name') == null) Router.go('startQuiz', {_id: this.params._id});
        
        Session.set('_id', this.params._id);
      },
      data: function() {
        var quiz = Session.get('quiz');
        if (Session.get('word') == null) {
          quiz.vocab = _.shuffle(quiz.vocab);
          for (var i = 0; i < quiz.vocab.length; i++) {
            quiz.vocab[i].index = i;
          }
          Session.set('quiz', quiz);
          Session.set('word', quiz.vocab[0]);
        }
        var vocab_word = Session.get('word');
        var wrong_count = vocab_word.wrong_answers.length;
        var answers = ['', '', '', ''];
        var i = Math.floor(Math.random() * wrong_count);
        var inx = Math.floor(Math.random() * 4);
        answers[inx] = vocab_word.answer;
        answers[(inx + 1) % 4] = vocab_word.wrong_answers[i % wrong_count];
        answers[(inx + 2) % 4] = vocab_word.wrong_answers[(i + 1) % wrong_count];
        answers[(inx + 3) % 4] = vocab_word.wrong_answers[(i + 2) % wrong_count] ;     
        return {
          _id: quiz._id,
          quiz_name: quiz.name,
          word: vocab_word.word,
          answer1: answers[0],
          answer2: answers[1],
          answer3: answers[2],
          answer4: answers[3]
        }

      }
    });

    this.route('answer', {
      path: '/quizzes/:_id/answer',
      before: function() {
        if (Session.get('player_name') == null) Router.go('/quizzes/' + this.params._id + '/start');
        if (Session.get('quiz') == null) Router.go('/quizzes/' + this.params._id + '/start');
        if (Session.get('word') == null) Router.go('question', {_id: this.params._id});
        
        Session.set('_id', this.params._id);
      },
      data: function() {
        var quiz = Session.get('quiz');
        
        var vocab_word = Session.get('word');
        var word = vocab_word.word;
        var answer = vocab_word.answer;
        
        return {
          _id: quiz._id,
          quiz_name: quiz.name,
          word: word,
          answer: answer
        }
      }
    });
    
    this.route('createquiz', {
      path: '/quizzes/create'
    });
    
    this.route('leaderboard', {
      path: '/quizzes/:_id/leaderboard',
      before: function() {
        Session.set('_id', this.params._id);
      },
      data: function() {
        var quiz = Session.get('quiz');
        var games = quiz.games || [];
        var recent = [];
        games.sort(function(a, b){
          if (a.score === b.score) {
            var atime = moment(a.end_time).subtract(moment(a.start_time)).seconds();
            var btime = moment(b.end_time).subtract(moment(b.start_time)).seconds();
            
            return atime - btime;
          }
          return b.score - a.score;
        });
        
        for (var i = 0; i < games.length; i++) {
          games[i].isAllWinner = (i === 0);
          var st = moment(games[i].start_time);
          var et = moment(games[i].end_time);
          var earliestRecentTime = moment().subtract('minutes', 5);
          games[i].time = et.subtract(st).seconds();
          if (moment(games[i].end_time).isAfter(earliestRecentTime.format())) {
            console.log('adding game: ' + games[i]);
            games[i].isRecentWinner = (recent.length === 0);
            recent.push(games[i]);
          }
        }
        return {
          _id: quiz._id,
          quiz_name: quiz.name,
          games: games,
          recent: recent
        };
      }
    });
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var count = Quizzes.find().count();
    if (count < 1) {
      Quizzes.remove({});


        Quizzes.insert({
            name:'Pearson',
            createdAt: moment().format(),
            vocab:[
                {"word":"brave","answer":"Bold; courageous; daring; intrepid; -- opposed to <ant>cowardly</ant>.","wrong_answers":["Not trembling or shaking with fear; fearless; bold; brave; undaunted; courageous","Incapable of being daunted; undaunted; bold; fearless; intrepid.","Vigorous in body; strong; powerful.","Possessing, or characterized by, courage; brave; bold.","Possessing or exhibiting valor; brave; courageous; valiant; intrepid.","Forward to meet danger; venturesome; daring; not timorous or shrinking from risk; brave; courageous.","Showy; splendid; magnificent; gay; well-dressed.","Boldness; fearlessness; adventurousness; also, a daring act.","Of or pertaining to, or like, a hero; of the nature of heroes; distinguished by the existence of heroes","Great of mind; elevated in soul or in sentiment; raised above what is low, mean, or ungenerous; of lofty and courageous spirit"]},
                {"word":"imaginative","answer":"Proceeding from, and characterized by, the imagination, generally in the highest sense of the word.","wrong_answers":["Capable of conceiving.","Having the power to create; exerting the act of creation.","Zealous; solicitous; vigilant; anxiously watchful.","Full of fancy; guided by fancy, rather than by reason and experience; whimsical.","Feigned; counterfeit.","Of or pertaining to a visions or visions; characterized by, appropriate to, or favorable for, visions.","Abounding in dreams or given to dreaming; appropriate to, or like, dreams; visionary."]},
                {"word":"decent","answer":"Suitable in words, behavior, dress, or ceremony; becoming; fit; decorous; proper; seemly.","wrong_answers":["Appropriate or fit; congruous; suitable; graceful; befitting.","imp. & p. p. of fight.","Suitable to a character, or to the time, place, and occasion; marked with decorum; becoming; proper; seemly; befitting","Belonging to one; one's own; individual.","Suited to the object, occasion, purpose, or character; suitable; fit; becoming; comely; decorous.","Restraining within due limits of propriety; not forward, bold, boastful, or presumptious; rather retiring than pushing one's self forward; not obstructive","Pleasing or agreeable to the sight; well-proportioned; good-looking; handsome.","Well-formed; having a regular shape; comely; symmetrical.","well-formed","Equal to the end proposed; adequate to wants; enough; ample; competent."]},
                {"word":"learning","answer":"The acquisition of knowledge or skill","wrong_answers":["The act of instructing; the result of thorough instruction; the state of being erudite or learned; the acquisitions gained by extensive reading or study; particularly, learning in literature or criticism, as distinct from the sciences; scholarship.","The character and qualities of a scholar; attainments in science or literature; erudition; learning.","Learning; acquaintance with letters or books.","letters","Knowledge; knowledge of principles and causes; ascertained truth of facts.","The space between the eye and bill, in birds, and the corresponding region in reptiles and fishes."]}
            ]
        });

        Quizzes.insert({
            name:'Tech Summit',
            createdAt: moment().format(),
            vocab:[
                {"word":"event","answer":"That which comes, arrives, or happens; that which falls out; any incident, good or bad.","wrong_answers":["The act of terminating, or of limiting or setting bounds; the act of ending or concluding.","To leap back; to rebound.","That which happens without design; chance; hazard; hap; hence, chance of danger or loss.","The act of passing or flowing out; a moving out from any inclosed place; egress.","A coming or happening.","The last part of anything; close; termination; end.","That which follows something on which it depends; that which is produced by a cause; a result.","Falling or striking upon, as a ray of light upon a reflecting surface.","That which busies one, or that which engages the time, attention, or labor of any one, as his principal concern or interest, whether for a longer or shorter time; constant employment; regular occupation.","That which is undertaken; something attempted to be performed; a work projected which involves activity, courage, energy, and the like; a bold, arduous, or hazardous attempt; an undertaking"]},
                {"word":"fly","answer":"To move in or pass through the air with wings, as a bird.","wrong_answers":["To avoid; to keep clear of; to get out of the way of; to escape from; to eschew.","To empty.","One who frequents the tables of the rich, or who lives at another's expense, and earns his welcome by flattery; a hanger-on; a toady; a sycophant.","To smear; to anoint.","Skilful; well informed; intelligent","To pursue for the purpose of killing or taking, as an enemy, or game; to hunt.","The act of flying; a passing through the air by the help of wings; volitation; mode or style of flying.","The longest, or longer, dimension of any object, in distinction from <contr>breadth</contr> or <contr>width</contr>; extent of anything from end to end; the longest line which can be drawn through a body, parallel to its sides","Lifted high up; having great height; towering; high."]},
                {"word":"innovate","answer":"To bring in as new; to introduce as a novelty.","wrong_answers":["To model or fashion anew; to change the form of.","To change completely, as by a revolution.","To introduce or use new words or terms or new uses of old words.","To innovate."]},
                {"word":"hack","answer":"A frame or grating of various kinds; as, a frame for drying bricks, fish, or cheese; a rack for feeding cattle; a grating in a mill race, etc.","wrong_answers":["A hollow cut in anything; a nick; an indentation.","To separate the parts of with, or as with, a sharp instrument; to make an incision in; to gash; to sever; to divide.","hacking","The driver of a hack or carriage for public hire.","To perform menial work; to labor in mean or unpleasant offices with toil and fatigue.","A female procurer, or pander.","hackneyed","performing work for pay.","Acting for reward; serving for pay; paid; hired; hireling; venal.","To cut by striking repeatedly with a sharp instrument; to cut into pieces; to mince; -- often with up."]}
            ]
        });

        Quizzes.insert({
            name:'Additional Words',
            createdAt: moment().format(),
            vocab:[
                {"word":"scholarship","answer":"The character and qualities of a scholar; attainments in science or literature; erudition; learning.","wrong_answers":["The act or state of knowing; clear perception of fact, truth, or duty; certain apprehension; familiar cognizance; cognition.","The act of instructing; the result of thorough instruction; the state of being erudite or learned; the acquisitions gained by extensive reading or study; particularly, learning in literature or criticism, as distinct from the sciences; scholarship.","The acquisition of knowledge or skill","The state or relation of being or associate.","The treasury of a college or monastery.","Support; aid; coöperation; esp., extraordinary aid in money rendered to the sovereign or to a friendly power.","Approval; approbation.","Settled pay or compensation for services, whether paid daily, monthly, or annually.","To give over; to make conveyance of; to give the possession or title of; to convey; -- usually in answer to petition."]},
                {"word":"engineer","answer":"A person skilled in the principles and practice of any branch of engineering. See under engineering, n.","wrong_answers":["The handling or government of anything, but esp. of a horse; management; administration. See manege.","A constructor of machines and engines; one versed in the principles of machines.","One who, or that which, drives; the person or thing that urges or compels anything else to move onward.","hydraulician","One skilled in the theory or construction of machines; a machinist.","A soldier detailed or employed to form roads, dig trenches, and make bridges, as an army advances."]},
                {"word":"efficacy","answer":"Power to produce effects; operation or energy of an agent or force; production of the effect intended","wrong_answers":["The quality or state of being potent; physical or moral power; inherent strength; energy; ability to effect a purpose; capability; efficacy; influence.","efficiency","To stuff; to lard; to farce.","Internal or inherent power; capacity of acting, operating, or producing an effect, whether exerted or not.","Manly strength or courage; bravery; daring; spirit; valor.","The quality of being effective.","Efficacy."]},
                {"word":"superfluous","answer":"More than is wanted or is sufficient; rendered unnecessary by superabundance; unnecessary; useless; excessive.","wrong_answers":["Characterized by abundance or superabundance; plenteous; rich; overflowing; copious or excessive in production","Having no need.","Exceeding what is natural or necessary; superabundant; exuberant.","Characterized by, or exhibiting, excess; overmuch.","Not necessary; not required under the circumstances; unless; needless.","Having, or being of, no use; unserviceable; producing no good end; answering no valuable purpose; not advancing the end proposed; unprofitable; ineffectual.","Wandering beyond one's bounds; roving; hence, foreign.","Not belonging to, or dependent upon, a thing; without or beyond a thing; not essential or intrinsic; foreign.","Of or pertaining to pleonasm; of the nature of pleonasm; redundant.","Beyond what is due, usual, expected, or necessary; additional; supernumerary; also, extraordinarily good; superior"]}
            ]
        });




    }
  });
}
