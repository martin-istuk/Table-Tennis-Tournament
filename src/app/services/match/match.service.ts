import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

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
			set1: [5, 11],
			set2: [6, 11],
			set3: [14, 12],
			set4: [11, 13],
			set5: [0, 0],
			score: [1, 3],
			winner: "Galadriel",
		},
		{
			id: "m-002",
			playerHome: "Galadriel",
			playerAway: "Gandalf",
			set1: [0, 11],
			set2: [0, 11],
			set3: [15, 13],
			set4: [14, 12],
			set5: [1, 11],
			score: [2, 3],
			winner: "Gandalf",
		},
		{
			id: "m-003",
			playerHome: "Aragorn",
			playerAway: "Elrond",
			set1: [11, 9],
			set2: [12, 10],
			set3: [11, 1],
			set4: [0, 0],
			set5: [0, 0],
			score: [3, 0],
			winner: "Aragorn",
		},
		{
			id: "m-004",
			playerHome: "Aragorn",
			playerAway: "Gandalf",
			set1: [8, 11],
			set2: [2, 11],
			set3: [13, 11],
			set4: [11, 7],
			set5: [17, 19],
			score: [2, 3],
			winner: "Gandalf",
		},
		{
			id: "m-005",
			playerHome: "Elrond",
			playerAway: "Gandalf",
			set1: [0, 0],
			set2: [0, 0],
			set3: [0, 0],
			set4: [0, 0],
			set5: [0, 0],
			score: [0, 0],
			winner: "Gandalf",
		},
		{
			id: "m-006",
			playerHome: "Aragorn",
			playerAway: "Galadriel",
			set1: [0, 0],
			set2: [0, 0],
			set3: [0, 0],
			set4: [0, 0],
			set5: [0, 0],
			score: [0, 0],
			winner: "Galadriel",
		},
	]);
	public matchArray$: Observable<Array<Match>> = this._matchArray$.asObservable();
}
