Template.leaderboard_allgames.helpers({
  isSuccessClass: function(isAllWinner) {
    return (isAllWinner) ? 'success' : '';
  },
  isAllWinnerClass: function(isAllWinner) {
    return (isAllWinner) ? 'icon-trophy' : '';
  },
  display_time: function(time) {
    return time + 's';
  }
});

Template.leaderboard_recentgames.helpers({
  isSuccessClass: function(isRecentWinner) {
    return (isRecentWinner) ? 'success' : '';
  },
  isRecentWinnerClass: function(isRecentWinner) {
    return (isRecentWinner) ? 'icon-trophy' : '';
  },
  display_time: function(time) {
    return time + 's';
  }
});

