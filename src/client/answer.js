Template.answer.helpers({
  isCorrect: function() {
    return Session.get('isCorrect');
  }
});

Template.answer.events({
  'submit' : function(e, t){
    e.preventDefault();
    
    Session.set('word', null);
    
    var quiz = Session.get('quiz');
    Router.go('question', {_id: quiz._id} );
  }
});


