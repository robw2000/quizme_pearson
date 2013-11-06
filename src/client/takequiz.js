Template.takeQuiz.helpers({
  quiz_name: function() {
    var quiz = Session.get('quiz');
    return quiz.name;
  },
  isUnanswered: function() {
    return Session.get('isAnswered');
  }
});
