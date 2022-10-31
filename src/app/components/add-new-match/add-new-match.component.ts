import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, Subscription } from "rxjs";

import { Player } from "src/app/interfaces/player.model";
import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";

@Component({
	selector: "app-add-new-match",
	templateUrl: "./add-new-match.component.html",
	styleUrls: ["./add-new-match.component.scss"],
})
export class AddNewMatchComponent implements OnDestroy {
	constructor(
		private matchService: MatchService,
		private playerService: PlayerService,
		private router: Router
	) {}

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;

	public playerHome?: string;
	public updatePlayerHome(value: string): void {
		this.playerHome = value;
	}

	public playerAway?: string;
	public updatePlayerAway(value: string): void {
		this.playerAway = value;
	}

	public set1HomeScore?: number;
	public set1AwayScore?: number;

	public updateHomeScore(value: string): void {
		const setIndex: number = Number(value.slice(3, 4));
	}

	public updateAwayScore(value: string): void {
		const setIndex: number = Number(value.slice(3, 4));
	}






	private addMatchSubscription?: Subscription;

	public onSubmit(): void {
		if (this.playerHome && this.playerAway) {
			this.addMatchSubscription = this.matchService
				.addNewMatch(this.playerHome, this.playerAway)
				.subscribe({
					next: () => {
						this.router.navigate([""]);
					},
					error: (error: Error) => {
						window.alert(error);
					},
				});
		}
	}

	ngOnDestroy(): void {
		this.addMatchSubscription?.unsubscribe();
	}
}