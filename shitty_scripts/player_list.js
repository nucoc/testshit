for( var i = 0; i < DOTALimits_t.DOTA_MAX_TEAM_PLAYERS; i++ ){
	if( Players.IsValidPlayerID( i ) ){
		$.Msg( 'Player' + i + ': ' + Players.GetPlayerName( i ) );
		$.Msg( Players.GetTeam( i ) + ' ' + Players.GetPlayerSelectedHero( i ) );
		$.Msg('');
	}
}
