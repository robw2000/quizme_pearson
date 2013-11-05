Template.startQuiz.helpers({
  quiz_name: function() {
    var quiz = Session.get('quiz');
    return quiz.name;
  }
//  playerNameIsSet: function() {
//    var name = Session.get('player_name');
//    return (name && name != '');
//  }
});

Template.startQuiz.events({
  'submit' : function(e, t){
    console.log('hit the submit button');
    e.preventDefault();
    // retrieve the input field values
    var player_name = t.find('#playername').value;
    if (player_name && player_name != '') {
      Session.set('player_name', player_name);
    }
    var quiz = Session.get('quiz');
    Router.go('takeQuiz', {_id: quiz._id} );
  }
});

