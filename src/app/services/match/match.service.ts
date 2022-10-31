import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, of } from "rxjs";

import { Match } from "src/app/interfaces/match.model";

@Injectable({
	providedIn: "root",
})
export class MatchService {
	private _matchArray$ = new BehaviorSubject<Array<Match>>([
		{
			id: "m-001",
			playerHome: "Elrond",
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
			playerAway: "Elrond",
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
		},
		{
			id: "m-005",
			playerHome: "Elrond",
			playerAway: "Gandalf",
			sets: [
				[11, 7], [12, 14], [8, 11], [13, 15]
			],
			score: [1, 3],
			winner: "Gandalf",
		},
		{
			id: "m-006",
			playerHome: "Aragorn",
			playerAway: "Galadriel",
			sets: [
				[9, 11], [11, 9], [9, 11], [12, 10], [10, 12]
			],
			score: [2, 3],
			winner: "Galadriel",
		},
	]);
	public matchArray$: Observable<Array<Match>> =
		this._matchArray$.asObservable();

	public addNewMatch(
		playerHome: string,
		playerAway: string,
		set1HomeScore: number,
		set1AwayScore: number,
		set2HomeScore: number,
		set2AwayScore: number,
		set3HomeScore: number,
		set3AwayScore: number,
		set4HomeScore?: number,
		set4AwayScore?: number,
		set5HomeScore?: number,
		set5AwayScore?: number
	): Observable<boolean> {
		// generate match ID
		const matchAmount: number = this._matchArray$.getValue().length;
		let newMatchId: string = "m-";
		if (matchAmount < 10) {
			newMatchId += "00";
		} else if (matchAmount < 100) {
			newMatchId += "0";
		}
		newMatchId += matchAmount + 1;

		// create and dispach new match
		this._matchArray$.next(
			this._matchArray$.getValue().concat([
				{
					id: newMatchId,
					playerHome: playerHome,
					playerAway: playerAway,
					sets: [],
					score: [0, 0],
					winner: "",
				} as Match,
			])
		);
		return of(true);
	}
}