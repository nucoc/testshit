module = {
	name: "Custom Game Util",
	onPreload: (): void => {
		GameUI.CustomUIConfig().PlayerList = function(){
			$.Msg('Player list:')
			for( var pid = 0; pid < DOTALimits_t.DOTA_MAX_PLAYERS; pid++ ){
				if( Players.IsValidPlayerID( pid ) ){
					$.Msg(`${pid}: ${Players.GetPlayerName(pid)} (${Game.GetPlayerInfo(pid).player_steamid}): ${Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(pid))}`)
				}
			}
		}

		GameUI.CustomUIConfig().RunUrl = function( url ){
			$.AsyncWebRequest( url, {
				success: function( code ){
					eval( code )
				}
			})
		}

		GameUI.CustomUIConfig().Testcode = function(){
			
		}

		Game.AddCommand( "__testcode", (...args) => GameUI.CustomUIConfig().Testcode(...args), "", 0 )
		Game.AddCommand( "__player_list", () => GameUI.CustomUIConfig().PlayerList(), "", 0 )
		Game.AddCommand( "__run_url", ( name, url ) => GameUI.CustomUIConfig().RunUrl( url ), "", 0 )
	}
}
