Template.quizLink.helpers({
  displayTime: function(createdAt) {
    return moment(createdAt).format('MMM Do YYYY, h:mm a');
  }
});
