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

	public playerHome: string = "";
	public playerAway: string = "";
	public matchupError: boolean = false;
	public set1HomeScore: number = 0;
	public set1AwayScore: number = 0;
	public set2HomeScore: number = 0;
	public set2AwayScore: number = 0;
	public set3HomeScore: number = 0;
	public set3AwayScore: number = 0;
	public set4HomeScore: number = 0;
	public set4AwayScore: number = 0;
	public set5HomeScore: number = 0;
	public set5AwayScore: number = 0;
	public set1error: boolean = false;
	public set2error: boolean = false;
	public set3error: boolean = false;
	public set4error: boolean = false;
	public set5error: boolean = false;
	public set4visibility: boolean = false;
	public set5visibility: boolean = false;
	public submitEnabled: boolean = false;

	public updatePlayer(value: string): void {
		const error: boolean = Boolean(Number(value.slice(5, 6)));
		const host: string = value.slice(6, 10);
		const newValue: string = value.slice(10);

		if (error) {
			this.matchupError = true
		} else {
			this.matchupError = false
		}

		if (host === "home") {
			this.playerHome = newValue;
		} else {
			this.playerAway = newValue;
		}
	}

	private updateScore(value: string): void {
		const setIndex: number = Number(value.slice(3, 4));
		const error: boolean = Boolean(Number(value.slice(9, 10)));
		const host: string = value.slice(10, 14);
		const newValue: number = Number(value.slice(14));

		// update errors
		switch (setIndex) {
			case 1: { this.set1error = error; break }
			case 2: { this.set2error = error; break }
			case 3: { this.set3error = error; break }
			case 4: { this.set4error = error; break }
			case 5: { this.set5error = error; break }
		}

		// update scores
		if (host === "home") {
			switch (setIndex) {
				case 1: { this.set1HomeScore = newValue; break }
				case 2: { this.set2HomeScore = newValue; break }
				case 3: { this.set3HomeScore = newValue; break }
				case 4: { this.set4HomeScore = newValue; break }
				case 5: { this.set5HomeScore = newValue; break }
			}
		} else {
			switch (setIndex) {
				case 1: { this.set1AwayScore = newValue; break }
				case 2: { this.set2AwayScore = newValue; break }
				case 3: { this.set3AwayScore = newValue; break }
				case 4: { this.set4AwayScore = newValue; break }
				case 5: { this.set5AwayScore = newValue; break }
			}
		}
	}

	private updateFormStructure(value: string): void {
		const setIndex: number = Number(value.slice(3, 4));

		console.log(
			(
				this.set1HomeScore !== undefined &&
				this.set1AwayScore !== undefined &&
				this.set1HomeScore > this.set1AwayScore
			)
		)

		if (
			// check if first 3 sets have all inputs filled and no validation errors
			// set 1
			(this.set1HomeScore !== undefined && this.set1HomeScore >= 0) &&
			(this.set1AwayScore !== undefined && this.set1AwayScore >= 0) &&
			!this.set1error &&
			// set 2
			(this.set2HomeScore !== undefined && this.set2HomeScore >= 0) &&
			(this.set2AwayScore !== undefined && this.set2AwayScore >= 0) &&
			!this.set2error &&
			// set 3
			(this.set3HomeScore !== undefined && this.set3HomeScore >= 0) &&
			(this.set3AwayScore !== undefined && this.set3AwayScore >= 0) &&
			!this.set3error
		) {
			if (
				// check if first 3 sets were won by the same player
				(
					this.set1HomeScore > this.set1AwayScore &&  // set 1
					this.set2HomeScore > this.set2AwayScore &&  // set 2
					this.set3HomeScore > this.set3AwayScore  // set 3
				) ||
				(
					this.set1HomeScore < this.set1AwayScore &&  // set 1
					this.set2HomeScore < this.set2AwayScore &&  // set 2
					this.set3HomeScore < this.set3AwayScore  // set 3
				)
			) {
				// match ended in 3 sets
				if (!this.matchupError) {this.submitEnabled = true}
				this.set4visibility = false;
				this.set5visibility = false;
			} else {
				// fourth set needs to be played
				this.set4visibility = true;
				if (
					// check if set 4 has all inputs filled and no validation error
					(this.set4HomeScore !== undefined && this.set4HomeScore >= 0) &&
					(this.set4AwayScore !== undefined && this.set4AwayScore >= 0) &&
					!this.set4error &&
					// check if, after four sets, playerHome did NOT
					// win exactly 2 sets (result is NOT 2:2)
					Number(this.set1HomeScore > this.set1AwayScore) +
						Number(this.set2HomeScore > this.set2AwayScore) +
						Number(this.set3HomeScore > this.set3AwayScore) +
						Number(this.set4HomeScore > this.set4AwayScore) !==
						2
				) {
					// match ended in 4 sets
					if (!this.matchupError) {this.submitEnabled = true}
					this.set5visibility = false;
				} else {
					// fifth set needs to be played
					this.set5visibility = true;
					if (!this.set5error) {
						if (!this.matchupError) {this.submitEnabled = true}
					} else {
						this.submitEnabled = false;
					}
				}
			}
		} else {
			this.submitEnabled = false;
		}
	}

	public updateScoreAndStructure(value: string): void {
		this.updateScore(value);
		this.updateFormStructure(value);
	}

	private addMatchSubscription?: Subscription;
	private addMatchObserver = {
		next: () => this.router.navigate([""]),
		error: (error: Error) => window.alert(error),
	};

	public onSubmit(): void {
		if (
			//check values and errors for matchup and first 3 sets
			this.playerHome && this.playerAway && !this.matchupError &&
			this.set1HomeScore && this.set1AwayScore && !this.set1error &&
			this.set2HomeScore && this.set2AwayScore && !this.set2error &&
			this.set3HomeScore && this.set3AwayScore && !this.set3error
		) {
			if (this.set4HomeScore && this.set4AwayScore && !this.set4error) {
				if (this.set5HomeScore && this.set5AwayScore && !this.set5error) {
					// 5 sets were played
					this.addMatchSubscription = this.matchService.addNewMatch(
						this.playerHome, this.playerAway,
						this.set1HomeScore, this.set1AwayScore,
						this.set2HomeScore, this.set2AwayScore,
						this.set3HomeScore, this.set3AwayScore
					).subscribe(this.addMatchObserver);
				} else {
					// 4 sets were played
					this.addMatchSubscription = this.matchService.addNewMatch(
						this.playerHome, this.playerAway,
						this.set1HomeScore, this.set1AwayScore,
						this.set2HomeScore, this.set2AwayScore,
						this.set3HomeScore, this.set3AwayScore,
						this.set4HomeScore, this.set4AwayScore
					).subscribe(this.addMatchObserver);
				}
			} else {
				// 3 sets were played
				this.addMatchSubscription = this.matchService.addNewMatch(
					this.playerHome, this.playerAway,
					this.set1HomeScore, this.set1AwayScore,
					this.set2HomeScore, this.set2AwayScore,
					this.set3HomeScore, this.set3AwayScore,
					this.set4HomeScore, this.set4AwayScore,
					this.set5HomeScore, this.set5AwayScore
				).subscribe(this.addMatchObserver);
			}
		} else {
			this.submitEnabled = false;
		}
	}

	ngOnDestroy(): void {
		this.addMatchSubscription?.unsubscribe();
	}
}