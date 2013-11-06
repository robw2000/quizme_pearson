Quizzes = new Meteor.Collection('quizzes');

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
        return Quizzes.find({});
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
      
      var quiz = Quizzes.findOne({ _id: this.params._id });
      if (quiz == null) {
        Session.set('isCorrect', false);
        Router.go('listQuizzes');
      } else {
        Session.set('quiz', quiz);
      }
    },
    data: function() {
      var quiz = Session.get('quiz');
      return {
        quiz_name: quiz.name
      }
    }
  });
  
  this.route('question', {
    path: '/quizzes/:_id/question',
    before: function() {
      if (Session.get('player_name') == null) Router.go('startQuiz', {_id: this.params._id});
      
      if (Session.get('quiz') == null) {
        var quiz = Quizzes.findOne({ _id: this.params._id });
        Session.set('quiz', quiz);
      }
    },
    data: function() {
      var quiz = Session.get('quiz');
      if (Session.get('word') == null) {
        var i = Math.floor(Math.random() * quiz.vocab.length);
        
        Session.set('word', quiz.vocab[i]);
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
    },
    data: function() {
      var quiz = Session.get('quiz');
      
      var vocab_word = Session.get('word');
      var word = vocab_word.word;
      var answer = vocab_word.answer;
      
      return {
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
    path: '/quizzes/:_id/leaderboard'
  });
});


if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var count = Quizzes.find().count();
    if (count < 1) {
      Quizzes.remove({});
      Quizzes.insert({
        name: 'Quizicals\' Vocabulary Quiz', 
        vocab: [
          {
            word: 'Apple',
            answer: 'A fruit that is not an orange or bannana',
            wrong_answers: [
              'A hairy primate that lives in the jungle',
              'A plastic toy given to infants to chew on',
              'A type of red dirt'
            ]
          },
          {
            word: 'Grapefruit',
            answer: 'A sour version of an orange',
            wrong_answers: [
              'A hairy primate that lives in the jungle',
              'A plastic toy given to infants to chew on',
              'A type of red dirt'
            ]
          }
        ]
      });

      Quizzes.insert({
        name: 'Rob W\'s Geology Quiz', 
        vocab: [
          {
            word: 'sedimentary',
            answer: 'Formed of sediment',
            wrong_answers: [
              'A hairy primate that lives in the jungle',
              'A plastic toy given to infants to chew on',
              'A type of red dirt'
            ]

          },
          {
            word: 'igneous',
            answer: 'Formed by cooling and heating',
            wrong_answers: [
              'A hairy primate that lives in the jungle',
              'A plastic toy given to infants to chew on',
              'A type of red dirt'
            ]

          }
        ]
      });
    }
  });
}
