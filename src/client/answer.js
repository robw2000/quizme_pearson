Template.answer.helpers({
  isCorrect: function() {
    return Session.get('isCorrect');
  }
});


Template.answer.events({
  'submit' : function(e, t){
    e.preventDefault();
    
    var quiz = Session.get('quiz');
    Router.go('question', {_id: quiz._id} );
  }
});


