Template.question.helpers({

});

Template.question.events({
  'submit' : function(e, t){
    e.preventDefault();

    var btn = t.find('input:radio[name=radiogrp]:checked') || {value: ''};
    var word = Session.get('word');
    Session.set('isCorrect', (btn.value === word.answer));
    var quiz = Session.get('quiz');
    Router.go('answer', {_id: quiz._id} );
  }
});

