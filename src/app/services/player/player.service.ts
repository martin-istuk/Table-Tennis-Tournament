import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";

import { Player } from "src/app/interfaces/player.model";
import { Match } from "src/app/interfaces/match.model";

@Injectable({
	providedIn: "root",
})
export class PlayerService {
	constructor(private router: Router) {}
	private _playerArray$ = new BehaviorSubject<Array<Player>>(
		[
			{
				id: "p-001",
				name: "Frodo",
				age: 53,
				matchIds: ["m-001", "m-003"],
				setWins: 1,
			},
			{
				id: "p-002",
				name: "Galadriel",
				age: 2650,
				matchIds: ["m-001", "m-002"],
				setWins: 5,
			},
			{
				id: "p-003",
				name: "Gandalf",
				age: 2021,
				matchIds: ["m-002", "m-004"],
				setWins: 6,
			},
			{
				id: "p-004",
				name: "Aragorn",
				age: 85,
				matchIds: ["m-003", "m-004"],
				setWins: 5,
			},
		]
		.sort( (a, b) => { return b.setWins - a.setWins }	)
	);

	public playerArray$: Observable<Array<Player>> =
		this._playerArray$.asObservable();

	public checkNameAvailability(name: string): boolean {
		const currentPlayers: Array<Player> = this._playerArray$.getValue();
		const newNameIndex: number = currentPlayers.findIndex( (player: Player) => {
			return player.name === name
		} );
		return (newNameIndex >= 0) ? false : true;
	}

	public addNewPlayer(playerName: string, playerAge: number): void {
		const playerAmount: number = this._playerArray$.getValue().length;
		let newPlayerId: string = "p-";
		if (playerAmount < 10) {
			newPlayerId += "00";
		} else if (playerAmount < 100) {
			newPlayerId += "0";
		}
		newPlayerId += playerAmount + 1;
		this._playerArray$.next(
			this._playerArray$.getValue().concat([
				{
					id: newPlayerId,
					name: playerName,
					age: playerAge,
					matchIds: [],
					setWins: 0,
				} as Player,
			])
		);
		this.router.navigate(["players"]);
	}

	public updatePlayersData(newMatch: Match): void {
		// get current player array
		const playerArray: Array<Player> = this._playerArray$.getValue();

		// get and edit playerHome
		const playerHome: Player = playerArray.filter(
			(player: Player) => player.name === newMatch.playerHome
		)[0];
		playerHome.matchIds.push(newMatch.id);
		playerHome.setWins += newMatch.score[0];

		// get and edit playerAway
		const playerAway: Player = playerArray.filter(
			(player: Player) => player.name === newMatch.playerAway
		)[0];
		playerAway.matchIds.push(newMatch.id);
		playerAway.setWins += newMatch.score[1];

		// remove old versions of players
		const newPlayerArray: Array<Player> = playerArray.filter( (player: Player) => {
			return (
				player.name !== newMatch.playerHome &&
				player.name !== newMatch.playerAway
			)
		} );

		//add new versions of players, sort by set wins and dispach
		newPlayerArray.push(playerHome, playerAway);
		newPlayerArray.sort( (a, b) => { return b.setWins - a.setWins }	);
		this._playerArray$.next(newPlayerArray);
	}
}