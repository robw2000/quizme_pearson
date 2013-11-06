Template.answer.helpers({

});


Template.startQuiz.events({
  'click #radio1': function(e, t) {
    var btn = t.find('#radio1');
    var word = Session.get('word');
    Session.set('isCorrect', (btn.value === word.answer));
  },
  'click #radio2': function(e, t) {
    var btn = t.find('#radio2');
    var word = Session.get('word');
    Session.set('isCorrect', (btn.value === word.answer));
  },
  'click #radio3': function(e, t) {
    var btn = t.find('#radio3');
    var word = Session.get('word');
    Session.set('isCorrect', (btn.value === word.answer));
  },
  'click #radio4': function(e, t) {
    var btn = t.find('#radio4');
    var word = Session.get('word');
    Session.set('isCorrect', (btn.value === word.answer));
  },

  'submit' : function(e, t){
    e.preventDefault();
    var quiz = Session.get('quiz');
    Router.go('answer', {_id: quiz._id} );
  }
});


