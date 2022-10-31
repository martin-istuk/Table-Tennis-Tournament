import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { BehaviorSubject, Observable, Subscription } from "rxjs";

import { Player } from "src/app/interfaces/player.model";
import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";
import { MatchupData } from "src/app/interfaces/matchup-data.model";
import { SetData } from "src/app/interfaces/set-data.model";

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
	public matchupError: boolean = true;
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
	public set1error: boolean = true;
	public set2error: boolean = true;
	public set3error: boolean = true;
	public set4error: boolean = true;
	public set5error: boolean = true;
	public set4visibility: boolean = false;
	public set5visibility: boolean = false;
	public _submitDisabled = new BehaviorSubject<boolean>(true);
	public submitDisabled = this._submitDisabled.asObservable();

	public updatePlayer(matchupData: MatchupData): void {
		this.playerHome = matchupData.playerHome;
		this.playerAway = matchupData.playerAway;
		this.matchupError = matchupData.error;
	}

	private updateSets(setData: SetData): void {
		switch (setData.setIndex) {
			case 1: {
				this.set1error = setData.error;
				this.set1HomeScore = setData.scoreHome;
				this.set1AwayScore = setData.scoreAway;
				break
			}
			case 2: {
				this.set2error = setData.error;
				this.set2HomeScore = setData.scoreHome;
				this.set2AwayScore = setData.scoreAway;
				break
			}
			case 3: {
				this.set3error = setData.error;
				this.set3HomeScore = setData.scoreHome;
				this.set3AwayScore = setData.scoreAway;
				break
			}
			case 4: {
				this.set4error = setData.error;
				this.set4HomeScore = setData.scoreHome;
				this.set4AwayScore = setData.scoreAway;
				break
			}
			case 5: {
				this.set5error = setData.error;
				this.set5HomeScore = setData.scoreHome;
				this.set5AwayScore = setData.scoreAway;
				break
			}
		}
	}

	private updateFormStructure(): void {

		console.log(
			(
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
					this.set1HomeScore > this.set1AwayScore && !this.set1error &&  // set 1
					this.set2HomeScore > this.set2AwayScore && !this.set2error &&  // set 2
					this.set3HomeScore > this.set3AwayScore && !this.set3error  // set 3
				) ||
				(
					this.set1HomeScore < this.set1AwayScore && !this.set1error &&  // set 1
					this.set2HomeScore < this.set2AwayScore && !this.set2error &&  // set 2
					this.set3HomeScore < this.set3AwayScore && !this.set3error  // set 3
				)
			) {
				// match ended in 3 sets
				this._submitDisabled.next(
					this.matchupError || this.set1error ||
					this.set2error || this.set3error
				);
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
					Number(this.set4HomeScore > this.set4AwayScore) !==	2
				) {
					// match ended in 4 sets
					this.set5visibility = false;
				} else {
					// fifth set needs to be played
					this.set5visibility = true;
				}
			}
		}
	}

	public updateScoreAndStructure(setData: SetData): void {
		this.updateSets(setData);
		this.updateFormStructure();
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
		}
	}

	ngOnDestroy(): void {
		this.addMatchSubscription?.unsubscribe();
	}
}