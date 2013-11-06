Template.leaderboard_allgames.helpers({
  isSuccessClass: function(isAllWinner) {
    return (isAllWinner) ? 'success' : '';
  },
  isAllWinnerClass: function(isAllWinner) {
    return (isAllWinner) ? 'icon-trophy' : '';
  }
});

Template.leaderboard_recentgames.helpers({
  isSuccessClass: function(isRecentWinner) {
    return (isRecentWinner) ? 'success' : '';
  },
  isRecentWinnerClass: function(isRecentWinner) {
    return (isRecentWinner) ? 'icon-trophy' : '';
  }
});

