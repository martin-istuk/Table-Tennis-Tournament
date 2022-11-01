import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Observable, map, switchMap, EMPTY } from "rxjs";

import { MatchService } from "src/app/services/match/match.service";
import { Match } from "src/app/interfaces/match.model";

@Component({
	selector: "app-match-overview",
	templateUrl: "./match-overview.component.html",
	styleUrls: ["./match-overview.component.scss"],
})
export class MatchOverviewComponent {
	constructor(
		private route: ActivatedRoute,
		private matchService: MatchService
	) {}

	private routeId$: Observable<string | null> = this.route.paramMap.pipe(
		map((params: ParamMap) => params.get("id"))
	);

	public match$: Observable<Match | null> = this.routeId$.pipe(
		switchMap((id: string | null) => {
			if (!id) {
				return EMPTY;
			}
			return this.matchService.getMatchById(id);
		})
	);
}
