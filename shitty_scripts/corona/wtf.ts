module = {
	name: "WTF Special",
	onPreload: (): void => {
		GameUI.CustomUIConfig().WtfKick = function( pid ){
			GameEvents.SendCustomGameEventToServer( 'player_kicked', {
				kicked_player_id: parseInt( pid, 10 )
			})
		}

		GameUI.CustomUIConfig().WtfBuff = function( pid ){
			pid = parseInt( pid, 10 )
			var _this = this

			if( !_this.buffedPlayers ){
				_this.buffedPlayers = {}
			}

			if( _this.buffedPlayers[ pid ] ){
				$.CancelScheduled( _this.buffedPlayers[ pid ] )
				_this.buffedPlayers[ pid ] = null
			} else {
				function f(){
					GameEvents.SendCustomGameEventToServer( 'sv_event_callback', {
						game_event: 'dota_player_used_ability',
						data: {
							caster_entindex: Players.GetPlayerHeroEntityIndex( pid ),
							abilityname: 'item_enchanted_mango'
						}
					})

					GameEvents.SendCustomGameEventToServer( 'sv_event_callback', {
						game_event: 'dota_player_used_ability',
						data: {
							caster_entindex: Players.GetPlayerHeroEntityIndex( pid ),
							abilityname: 'item_clarity'
						}
					})

					_this.buffedPlayers[ pid ] = $.Schedule( 0.5, f )
				}

				f()
			}
		}

		GameUI.CustomUIConfig().WtfSmoke = function(){
			let team = Players.GetTeam( Players.GetLocalPlayer() )
			for( var pid = 0; pid < DOTALimits_t.DOTA_MAX_TEAM_PLAYERS; pid++ ){
				if( Players.GetTeam( pid ) == team ){
					GameEvents.SendCustomGameEventToServer( 'sv_event_callback', {
						game_event: 'dota_player_used_ability',
						data: {
							caster_entindex: Players.GetPlayerHeroEntityIndex( pid ),
							abilityname: 'item_smoke_of_deceit'
						}
					})
				}
			}
		}

		GameUI.CustomUIConfig().WtfLog = function( msg, args ){
			var [pid, pid2, int_value] = args.match(/\d+/g)
			for( var team = DOTATeam_t.DOTA_TEAM_GOODGUYS; team < DOTATeam_t.DOTA_TEAM_COUNT; team++ ){
				GameEvents.SendCustomGameEventToServer( 'sv_event_callback', {
					game_event: 'dota_combat_event_message',
					data: {
						message: msg,
						teamnumber: team,
						player_id: pid && parseInt( pid, 10 ),
						player_id2: pid2 && parseInt( pid2, 10 ),
						int_value: int_value && parseInt( int_value, 10 )
					}
				})
			}
		}

		GameUI.CustomUIConfig().WtfEvent = function( event, data ){
			GameEvents.SendCustomGameEventToServer( 'sv_event_callback', {
				game_event: event,
				data: eval(`new Object(${data})`)
			})
		}

		GameUI.CustomUIConfig().WtfRosh = function( pid, count ){
			let rosh = Entities.GetAllEntitiesByClassname('npc_dota_roshan')[0]
			count = count || 1
			if( rosh ){
				for( var i = 0; i < count; i++ ){
					GameEvents.SendCustomGameEventToServer( 'sv_event_callback', {
						game_event: 'entity_killed',
						data: {
							entindex_killed: rosh,
							entindex_attacker: Players.GetPlayerHeroEntityIndex( parseInt( pid ) )
						}
					})
				}
			}
		}

		GameUI.CustomUIConfig().WtfToggleRespawn = function( pid ){
			pid = parseInt( pid, 10 )
			var _this = this

			if( !_this.respawnPlayers ){
				_this.respawnPlayers = {}
			}

			if( _this.respawnPlayers[ pid ] ){
				$.CancelScheduled( _this.respawnPlayers[ pid ] )
				_this.respawnPlayers[ pid ] = null
			} else {
				function f(){
					GameEvents.SendCustomGameEventToServer( 'sv_event_callback', {
						game_event: 'entity_killed',
						data: {
							entindex_killed: Players.GetPlayerHeroEntityIndex( pid )
						}
					})

					_this.respawnPlayers[ pid ] = $.Schedule( 0.5, f )
				}

				f()
			}
		}

		Game.AddCommand( "__wtf_kick", ( name, pid ) => GameUI.CustomUIConfig().WtfKick( pid ), "", 0 )
		Game.AddCommand( "__wtf_buff", ( name, pid ) => GameUI.CustomUIConfig().WtfBuff( pid ), "", 0 )
		Game.AddCommand( "__wtf_smoke", ( name ) => GameUI.CustomUIConfig().WtfSmoke(), "", 0 )
		Game.AddCommand( "__wtf_rosh", ( name, pid, count ) => GameUI.CustomUIConfig().WtfRosh( pid, count ), "", 0 )
		Game.AddCommand( "__wtf_respawn", ( name, pid ) => GameUI.CustomUIConfig().WtfToggleRespawn( pid ), "", 0 )
		Game.AddCommand( "__wtf_log", ( name, msg, args ) => GameUI.CustomUIConfig().WtfLog( msg, args ), "", 0 )
		Game.AddCommand( "__wtf_event", ( name, event, data ) => GameUI.CustomUIConfig().WtfEvent( event, data ), "", 0 )
	}
}
