import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Observable, map, switchMap, EMPTY } from "rxjs";

import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";

@Component({
	selector: "app-player-overview",
	standalone: true,
	imports: [CommonModule],
	template: `
		<h2>Player ID</h2>
		<p>{{ (player$ | async)?.id }}</p>

		<h2>Name</h2>
		<p>{{ (player$ | async)?.name }}</p>

		<h2>Age</h2>
		<p>{{ (player$ | async)?.age }}</p>

		<h2>Games played</h2>
		@if ((player$ | async)?.matchIds; as matches) {
		<div>
			<p>{{ matches.length }}</p>
		</div>
		}

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
