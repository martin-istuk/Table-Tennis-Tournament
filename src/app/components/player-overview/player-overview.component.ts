import { Component, inject } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Observable, map, switchMap, EMPTY } from "rxjs";

import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";
import { NgIf, AsyncPipe } from "@angular/common";

@Component({
	selector: "app-player-overview",
	template: `
		<h2>Player ID</h2>
		<p>{{ (player$ | async)?.id }}</p>

		<h2>Name</h2>
		<p>{{ (player$ | async)?.name }}</p>

		<h2>Age</h2>
		<p>{{ (player$ | async)?.age }}</p>

		<h2>Games played</h2>
		<div *ngIf="(player$ | async)?.matchIds as matches">
			<p>{{ matches.length }}</p>
		</div>

		<h2>Set wins</h2>
		<p>{{ (player$ | async)?.setWins }}</p>
	`,
	styles: `
		:host {
			display: grid;
			grid-template-columns: auto;
			justify-items: center;
			h2 {
				margin-top: 1rem;
			}
		}
`,
	standalone: true,
	imports: [NgIf, AsyncPipe]
})
export class PlayerOverviewComponent {
	private route = inject(ActivatedRoute);
	private playerService = inject(PlayerService);

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
