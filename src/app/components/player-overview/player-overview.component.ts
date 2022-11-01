import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Observable, map, switchMap, EMPTY } from "rxjs";

import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";

@Component({
	selector: "app-player-overview",
	templateUrl: "./player-overview.component.html",
	styleUrls: ["./player-overview.component.scss"],
})
export class PlayerOverviewComponent {
	constructor(
		private route: ActivatedRoute,
		private playerService: PlayerService
	) {}

	private routeId$: Observable<string | null> = this.route.paramMap.pipe(
		map((params: ParamMap) => params.get("id"))
	);

	public player$: Observable<Player | null> = this.routeId$.pipe(
		switchMap((id: string | null) => {
			if (!id) {
				return EMPTY;
			}
			return this.playerService.getPlayerById(id);
		})
	);
}
