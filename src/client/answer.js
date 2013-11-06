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
      Session.set('end_time', moment());
      Router.go('leaderboard', {_id: quiz._id} );
    } else {
      Router.go('question', {_id: quiz._id} );
    }
  }
});


