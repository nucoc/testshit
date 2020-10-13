for( var nArg = 2; nArg < qArgs.length; nArg++ ){
	var nTarget = GetIntArg( nArg );
	if( typeof( nTarget ) == 'number' ){
		GameEvents.SendCustomGameEventToServer( 'player_kicked', {
			kicked_player_id: nTarget
		});
	}
}
