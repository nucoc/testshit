var nTarget = GetIntArg( 2, Players.GetLocalPlayer() );

var nVictimPlayer = GetIntArg( 3 );

var nMask = GetIntArg( 4, 3 );

var nAntiMask = 0;
var nFlag = 1;
for( var i = 0; i <= 2; i++ ){
	if( ( nMask / nFlag ) % 2 == 0 ){
		nAntiMask += nFlag;
	}
	nFlag *= 2;
}

var fControl = function( nVictim, nController ){
	if( nVictim == nController ) return;
	
	if( nMask )
	GameEvents.SendCustomGameEventToServer( 'mask_changed', {
		player_id: nVictim,
		target_id: nController,
		state: 1,
		mask_id: nMask,
	});
	
	if( nAntiMask )
	GameEvents.SendCustomGameEventToServer( 'mask_changed', {
		player_id: nVictim,
		target_id: nController,
		state: 0,
		mask_id: nAntiMask,
	});
};

if( typeof( nVictimPlayer ) == 'number' ){
	fControl( nVictimPlayer, nTarget );
} else {
	for( var i = 0; i < DOTALimits_t.DOTA_MAX_TEAM_PLAYERS; i++ ){
		fControl( i, nTarget );
	}
}
