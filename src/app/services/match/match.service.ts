import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { BehaviorSubject, of, Observable } from "rxjs";
import { AddNewMatch } from "src/app/interfaces/add-new-match.type";

import { Match } from "src/app/interfaces/match.model";
import { PlayerService } from "../player/player.service";

@Injectable({
	providedIn: "root",
})
export class MatchService {
	constructor(private router: Router, private playerService: PlayerService) {}

	private _matchArray$ = new BehaviorSubject<Array<Match>>([
		{
			id: "m-001",
			playerHome: "Frodo",
			playerAway: "Galadriel",
			sets: [
				[5, 11], [6, 11], [14, 12], [11, 13]
			],
			score: [1, 3],
			winner: "Galadriel",
		},
		{
			id: "m-002",
			playerHome: "Galadriel",
			playerAway: "Gandalf",
			sets: [
				[0, 11], [0, 11], [15, 13], [14, 12], [1, 11]
			],
			score: [2, 3],
			winner: "Gandalf",
		},
		{
			id: "m-003",
			playerHome: "Aragorn",
			playerAway: "Frodo",
			sets: [
				[11, 9], [12, 10], [11, 1]
			],
			score: [3, 0],
			winner: "Aragorn",
		},
		{
			id: "m-004",
			playerHome: "Aragorn",
			playerAway: "Gandalf",
			sets: [
				[8, 11], [2, 11], [13, 11], [11, 7], [17, 19]
			],
			score: [2, 3],
			winner: "Gandalf",
		}
	]);
	public matchArray$: Observable<Array<Match>> =
		this._matchArray$.asObservable();

	public addNewMatch(match: AddNewMatch): void {
		// generate match ID
		const matchAmount: number = this._matchArray$.getValue().length;
		let newMatchId: string = "m-";
		if (matchAmount < 10) {
			newMatchId += "00";
		} else if (matchAmount < 100) {
			newMatchId += "0";
		}
		newMatchId += matchAmount + 1;

		// create new match
		const newMatch: Match = {
			id: newMatchId,
			playerHome: match.playerHome,
			playerAway: match.playerAway,
			sets: [],
			score: [0, 0],
			winner: "",
		};

		// define sets
		newMatch.sets.push( [match.set1HomeScore, match.set1AwayScore] );
		newMatch.sets.push( [match.set2HomeScore, match.set2AwayScore] );
		newMatch.sets.push( [match.set3HomeScore, match.set3AwayScore] );
		if (
			match.set4HomeScore !== undefined && match.set4HomeScore >= 0 &&
			match.set4AwayScore !== undefined && match.set4AwayScore >= 0
		) {
			newMatch.sets.push( [match.set4HomeScore, match.set4AwayScore] );
		}
		if (
			match.set5HomeScore !== undefined && match.set5HomeScore >= 0 &&
			match.set5AwayScore !== undefined && match.set5AwayScore >= 0
		) {
			newMatch.sets.push( [match.set5HomeScore, match.set5AwayScore] );
		}

		// define match score
		newMatch.sets.forEach( (setArray: Array<number>) => {
			if (setArray[0] > setArray[1]) {
				newMatch.score[0]++
			} else {
				newMatch.score[1]++
			}
		} );

		// define match winner
		if (newMatch.score[0] > newMatch.score[1]) {
			newMatch.winner = match.playerHome
		} else {
			newMatch.winner = match.playerAway
		}

		// dispach new match
		this._matchArray$.next(
			this._matchArray$.getValue().concat([newMatch])
		);

		// add new match ID to players data and update win rate
		this.playerService.updatePlayersData(newMatch);

		this.router.navigate([""]);
	}

	public getMatchById(id: string): Observable<Match> {
		const match: Match = this._matchArray$.getValue().filter( (match: Match) => {
			return match.id === id
		} )[0];
		return of(match);
	}
}