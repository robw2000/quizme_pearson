Template.leaderboard_allgames.helpers({
  isAllWinnerClass: function(isAllWinner) {
    return (isAllWinner) ? 'icon-trophy' : '';
  },
  display_time: function(time) {
    return time + 's';
  }
});

Template.leaderboard_recentgames.helpers({
  isRecentWinnerClass: function(isRecentWinner) {
    return (isRecentWinner) ? 'icon-trophy' : '';
  },
  display_time: function(time) {
    return time + 's';
  }
});

