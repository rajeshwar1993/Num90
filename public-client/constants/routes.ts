const Routes = {
  home: '/',
  myGames: '/my-games',
  gamePlay: (gamePlayId: string) => `/game-play/${gamePlayId}`,
  joinGame: '/join-game/',
  userProfile: '/user-profile'
};

export default Routes;
