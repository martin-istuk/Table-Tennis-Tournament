import { Component } from "@angular/core";

import { MatchService } from "src/app/services/match/match.service";
import { Match } from "src/app/interfaces/match.model";

@Component({
	selector: "app-match-list",
	templateUrl: "./match-list.component.html",
	styleUrls: ["./match-list.component.scss"],
})
export class MatchListComponent {
	constructor(public matchService: MatchService) {}

	public displayedColumns: Array<string> = [
		"matchId",
		"playerHome",
		"score",
		"playerAway"
	];

	public matchList: Array<Match> = this.matchService.initialMatchArray;

	public toggleAddNewMatch(): void {}
}
