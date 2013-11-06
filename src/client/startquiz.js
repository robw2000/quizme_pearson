Template.startQuiz.helpers({
});

Template.startQuiz.events({
  'submit' : function(e, t){
    e.preventDefault();
    // retrieve the input field values
    var player_name = t.find('#playername').value;
    if (player_name && player_name != '') {
      Session.set('player_name', player_name);
    }
    var quiz = Session.get('quiz');
    Router.go('question', {_id: quiz._id} );
  }
});

