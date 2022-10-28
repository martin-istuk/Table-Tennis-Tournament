import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

import { Player } from "src/app/interfaces/player.model";

@Injectable({
	providedIn: "root",
})
export class PlayerService {
	private _playerArray$ = new BehaviorSubject<Array<Player>>([
		{
			id: "p-001",
			name: "Frodo",
			age: 53,
			matchIds: ["m-001", "m-003"],
			winRate: 0
		},
		{
			id: "p-002",
			name: "Galadriel",
			age: 2650,
			matchIds: ["m-001", "m-002"],
			winRate: 0.5
		},
		{
			id: "p-003",
			name: "Gandalf",
			age: 2021,
			matchIds: ["m-002", "m-004"],
			winRate: 1
		},
		{
			id: "p-004",
			name: "Aragorn",
			age: 85,
			matchIds: ["m-003", "m-004"],
			winRate: 0.5
		},
	]);

	public playerArray$: Observable<Array<Player>> = this._playerArray$.asObservable();
}
