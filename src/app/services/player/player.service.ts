import { Injectable } from "@angular/core";

import { Player } from "src/app/interfaces/player.model";

@Injectable({
	providedIn: "root",
})
export class PlayerService {
	public initialPlayerArray: Array<Player> = [
		{
			playerId: "p-001",
			name: "Elrond",
			matchIds: ["m-001", "m-003"],
		},
		{
			playerId: "p-002",
			name: "Galadriel",
			matchIds: ["m-001", "m-002"],
		},
		{
			playerId: "p-003",
			name: "Gandalf",
			matchIds: ["m-002", "m-004"],
		},
		{
			playerId: "p-004",
			name: "Aragorn",
			matchIds: ["m-003", "m-004"],
		},
	];
}
