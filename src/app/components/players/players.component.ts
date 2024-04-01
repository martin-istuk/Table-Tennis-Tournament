import { Component } from "@angular/core";

import { Observable } from "rxjs";

import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";
import { MatTableModule } from "@angular/material/table";
import { NgIf, AsyncPipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-players",
    templateUrl: "./players.component.html",
    styleUrls: ["./players.component.scss"],
    standalone: true,
    imports: [MatButtonModule, RouterLink, MatIconModule, NgIf, MatTableModule, AsyncPipe]
})
export class PlayersComponent {
	constructor(public playerService: PlayerService) {}

	public displayedColumns: Array<string> = [
		"id",
		"name",
		"age",
		"gamesPlayed",
		"setWins",
	];

	public playerList$: Observable<Array<Player>> =
		this.playerService.playerArray$;
}
