import { Component } from "@angular/core";

import { Observable } from "rxjs";

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
		"id",
		"match",
		"setScores",
	];

	public matchList$: Observable<Array<Match>> = this.matchService.matchArray$;

	public addNewMatch(): void {}
}
