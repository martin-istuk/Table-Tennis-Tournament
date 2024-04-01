import { Component } from "@angular/core";

import { Observable } from "rxjs";

import { MatchService } from "src/app/services/match/match.service";
import { Match } from "src/app/interfaces/match.model";
import { MatTableModule } from "@angular/material/table";
import { NgIf, AsyncPipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-match-list",
    templateUrl: "./match-list.component.html",
    styleUrls: ["./match-list.component.scss"],
    standalone: true,
    imports: [MatButtonModule, RouterLink, MatIconModule, NgIf, MatTableModule, AsyncPipe]
})
export class MatchListComponent {
	constructor(public matchService: MatchService) {}

	public displayedColumns: Array<string> = [
		"id",
		"matchup",
		"score",
	];

	public matchList$: Observable<Array<Match>> = this.matchService.matchArray$;

	public addNewMatch(): void {}
}
