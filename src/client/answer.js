Template.answer.helpers({
  isCorrect: function() {
    return Session.get('isCorrect');
  }
});

Template.answer.events({
  'submit' : function(e, t){
    e.preventDefault();

    var quiz = Session.get('quiz');
    var word = Session.get('word');
    var isGameOver = false;
    if (word != null) {
      var i = word.index;
      if (i >= quiz.vocab.length - 1) {
        isGameOver = true;
        Session.set('word', null);
      } else {
        Session.set('word', quiz.vocab[i+1]);
      }
    }
    
    if (isGameOver) {
        Session.set('end_time', moment().format());
        var total = quiz.vocab.length;

        var countCorrect = Session.get('countCorrect');

        var timeSec = "";
        if (Session.get('end_time') && Session.get('start_time')){
            timeSec =  Math.round((moment(Session.get('end_time')).valueOf() - moment(Session.get('start_time')).valueOf())/1000);
        }
        var score = 0;
        if (total && countCorrect ) {
            score = Math.round(countCorrect/total*100);
        }
        var games =  { 'games' : { 'player_name' : Session.get('player_name') ,
            'start_time' : Session.get('start_time') ,
            'end_time' : Session.get('end_time'),
            'score' : score ,
            'timeTaken' : timeSec }}  ;

      Meteor.call('updateQuiz' , quiz._id , games ) ;
        Router.go('leaderboard', {_id: quiz._id} );
    } else {
      Router.go('question', {_id: quiz._id} );
    }
  }
});


