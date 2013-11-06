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
        console.log(total)  ;

        var countCorrect = Session.get('countCorrect');
        console.log(countCorrect)  ;

        var score = Math.round(countCorrect/total*100);
        console.log(score)  ;
        var games =  { 'games' : { 'player_name' : Session.get('player_name') ,
            'start_time' : Session.get('start_time') ,
            'end_time' : Session.get('end_time'),
            'score' : score }}  ;

      Meteor.call('updateQuiz' , quiz._id , games ) ;
        Router.go('leaderboard', {_id: quiz._id} );
    } else {
      Router.go('question', {_id: quiz._id} );
    }
  }
});


