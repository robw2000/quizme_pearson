Template.quizLink.helpers({
  displayTime: function(createdAt) {
    console.log('displayTime: ' + createdAt);
    return moment(createdAt).format('MMM Do YYYY, h:mm a');
  }
});
