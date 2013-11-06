Template.question.helpers({

});

Template.question.events({
  'submit' : function(e, t){
    e.preventDefault();

    var btn = t.find('input:radio[name=radiogrp]:checked') || {value: ''};
    var word = Session.get('word');
    Session.set('isCorrect', (btn.value === word.answer));
    if (Session.get('isCorrect')){
        if (Session.get('countCorrect')){
            Session.set('countCorrect' , Session.get('countCorrect') + 1);

        } else {
            Session.set('countCorrect', 1);
        }
    }
    var quiz = Session.get('quiz');
    Router.go('answer', {_id: quiz._id} );
  }
});

