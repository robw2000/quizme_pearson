Quizzes = new Meteor.Collection('quizzes');

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('home', {
    path: '/'
  });
  
  this.route('quizList', {
    path: '/quizzes',
    data: {
      quizzes: function() {
        return Quizzes.find({});
      }
    }
  });
  
  this.route('quizShow', {
    path: '/quizzes/:_id',
    data: function() {
      var id = this.params._id;
      return {
        vocab_word: function() {
          var quiz = Quizzes.find({ _id: id });
          var index = Math.floor(Math.random() * quiz.vocab.length);
          return index;
          //return quiz.vocab[index].word;
          //return 'question text';
        },
        answerOptions: function() {
          //var id = this.params._id;
          //var quiz = Quizzes.find({ _id: id });
          return 'answer';// quiz.answer;
        }
      }
    }
  });
  
  this.route('createquiz', {
    path: '/quizzes/create'
  });
  
  this.route('leaderboard', {
    path: '/quizzes/:_id/leaderboard'
  });
});


if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Quizzes.remove({});
    Quizzes.insert({
      name: 'Fruit Quiz', 
      vocab: [
        {
          word: 'Apple',
          answer: 'A fruit that is not an orange or bannana'
        },
        {
          word: 'Grapefruit',
          answer: 'A sour version of an orange'
        }
      ]
    });

    Quizzes.insert({
      name: 'Geology Quiz', 
      vocab: [
        {
          word: 'sedimentary',
          answer: 'Formed of sediment'
        },
        {
          word: 'igneous',
          answer: 'Formed by cooling and heating'
        }
      ]
    });

  });
}
