var fSpamLock = function(){
  Game.SetTeamSelectionLocked( true );
  
  if( Game.GameStateIsBefore( DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION ) ){
    $.Schedule( 0, fSpamLock );
  }
}

fSpamLock();
