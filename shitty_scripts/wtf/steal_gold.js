var nTarget = GetIntArg( 2, Players.GetLocalPlayer() );
var nTeam = Players.GetTeam( nTarget );

var xVictim = qArgs[3];
var fStealFromCondition = function( nVictim ){
	return ( nVictim != nTarget );
}
if( xVictim == 'enemy' ){
	fStealFromCondition = function( nVictim ){
		return ( Players.GetTeam( nVictim ) != nTeam );
	}
} else if( xVictim == 'ally' ){
	fStealFromCondition = function( nVictim ){
		return ( Players.GetTeam( nVictim ) == nTeam );
	}
} else {
	xVictim = GetIntArg( 3 );
	if( typeof( xVictim ) == 'number' ){
		fStealFromCondition = function( nVictim ){
			return ( nVictim == xVictim );
		}	
	}
}

var nRepeat = GetIntArg( 4, 10 );

for( var i = 0; i < DOTALimits_t.DOTA_MAX_TEAM_PLAYERS; i++ ){
	if( Players.IsValidPlayerID( i ) && fStealFromCondition( i ) ){
		for( var n = 0; n < nRepeat; n++ ){
			GameEvents.SendCustomGameEventToServer( 'player_shared_gold', {
				grantorPlayerID: i,
				recieverPlayerID: nTarget
			});
		}
	}
}
