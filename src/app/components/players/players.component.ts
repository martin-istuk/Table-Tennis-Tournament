import { Component } from "@angular/core";

import { Observable } from "rxjs";

import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";

@Component({
	selector: "app-players",
	templateUrl: "./players.component.html",
	styleUrls: ["./players.component.scss"],
})
export class PlayersComponent {
	constructor(public playerService: PlayerService) {}

	public displayedColumns: Array<string> = [
		"id",
		"name",
		"age",
		"gamesPlayed",
		"winRate",
	];

	public playerList$: Observable<Array<Player>> =
		this.playerService.playerArray$;
}
