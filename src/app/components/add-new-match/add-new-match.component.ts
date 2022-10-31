import { Component, OnChanges, OnDestroy } from "@angular/core";
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
export class AddNewMatchComponent implements OnChanges, OnDestroy {
	constructor(
		private matchService: MatchService,
		private playerService: PlayerService,
		private router: Router
	) {}

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;

	public playerHome?: string;
	public playerAway?: string;
	public set1HomeScore?: number;
	public set1AwayScore?: number;
	public set2HomeScore?: number;
	public set2AwayScore?: number;
	public set3HomeScore?: number;
	public set3AwayScore?: number;
	public set4HomeScore?: number;
	public set4AwayScore?: number;
	public set5HomeScore?: number;
	public set5AwayScore?: number;

	public updatePlayer(value: string): void {
		const host: string = value.slice(0, 4);
		const newValue: string = value.slice(4);
		if (host === "home") {
			this.playerHome = newValue;
		} else {
			this.playerAway = newValue;
		}
	}

	public updateScore(value: string): void {
		const setIndex: number = Number(value.slice(3, 4));
		const host: string = value.slice(4, 8);
		const newValue: number = Number(value.slice(8));
		if (host === "home") {
			switch(setIndex) {
				case 1: { this.set1HomeScore = newValue; break }
				case 2: { this.set2HomeScore = newValue; break }
				case 3: { this.set3HomeScore = newValue; break }
				case 4: { this.set4HomeScore = newValue; break }
				default: { this.set5HomeScore = newValue }
			}
		} else {
			switch(setIndex) {
				case 1: { this.set1AwayScore = newValue; break }
				case 2: { this.set2AwayScore = newValue; break }
				case 3: { this.set3AwayScore = newValue; break }
				case 4: { this.set4AwayScore = newValue; break }
				default: { this.set5AwayScore = newValue }
			}
		}
	}

	public set4visibility: boolean = false;
	public set5visibility: boolean = false;

	ngOnChanges(): void {
	}

	private updateFormStructure(): void {
		if (
			// check if first 3 sets have all inputs filled
			this.set1HomeScore &&
			this.set1AwayScore &&
			this.set2HomeScore &&
			this.set2AwayScore &&
			this.set3HomeScore &&
			this.set3AwayScore
		) {
			if (
				// check if first 3 sets were won by the same player
				(
					this.set1HomeScore > this.set1AwayScore &&
					this.set2HomeScore > this.set2AwayScore &&
					this.set3HomeScore > this.set3AwayScore
				) ||
				(
					this.set1HomeScore > this.set1AwayScore &&
					this.set2HomeScore > this.set2AwayScore &&
					this.set3HomeScore > this.set3AwayScore
				)
			) {
				// match ended in 3 sets
				this.set4visibility = false;
				this.set5visibility = false;
			} else {
				// fourth set needs to be played
				this.set4visibility = true;
				if (
					// check if fourth set has all inputs filled
					this.set4HomeScore &&
					this.set4AwayScore &&
					(
						// check if, after four sets, playerHome did NOT
						// win exactly 2 sets (result is NOT 2:2)
						Number(this.set1HomeScore > this.set1AwayScore) +
						Number(this.set2HomeScore > this.set2AwayScore) +
						Number(this.set3HomeScore > this.set3AwayScore) +
						Number(this.set4HomeScore > this.set4AwayScore) !== 2
					)
				) {
					// match ended in 4 sets
					this.set5visibility = false;
				} else {
					// fifth set needs to be played
					this.set5visibility = true;
				}
			}
		};
	}

	private addMatchSubscription?: Subscription;

	public onSubmit(): void {
		if (this.playerHome && this.playerAway) {
			this.addMatchSubscription = this.matchService
				.addNewMatch(this.playerHome, this.playerAway)
				.subscribe({
					next: () => this.router.navigate([""]),
					error: (error: Error) => window.alert(error)
				});
		}
	}

	ngOnDestroy(): void {
		this.addMatchSubscription?.unsubscribe();
	}
}