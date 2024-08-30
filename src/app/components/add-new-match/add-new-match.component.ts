import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Observable } from "rxjs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { Player } from "src/app/interfaces/player.model";
import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";
import { MatchupData } from "src/app/interfaces/matchup-data.type";
import { SetData } from "src/app/interfaces/set-data.type";
import { AddNewMatch } from "src/app/interfaces/add-new-match.type";
import { SetComponent } from "./set/set.component";
import { MatchupComponent } from "./matchup/matchup.component";

@Component({
	selector: "app-add-new-match",
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatchupComponent,
		SetComponent,
	],
	template: `
		<h2>Add new match</h2>

		<!-- MATCHUP INPUTS -->
		<app-matchup (playerChangeEvent)="updatePlayer($event)"></app-matchup>

		<!-- SET INPUTS -->
		<app-set
			[setIndex]="1"
			(scoreChangeEvent)="updateScoreAndStructure($event)"
		></app-set>
		<app-set
			[setIndex]="2"
			(scoreChangeEvent)="updateScoreAndStructure($event)"
		></app-set>
		<app-set
			[setIndex]="3"
			(scoreChangeEvent)="updateScoreAndStructure($event)"
		></app-set>
		@if (set4visibility) {
		<app-set
			[setIndex]="4"
			(scoreChangeEvent)="updateScoreAndStructure($event)"
		></app-set>
		} @if (set5visibility) {
		<app-set
			[setIndex]="5"
			(scoreChangeEvent)="updateScoreAndStructure($event)"
		></app-set>
		}

		<!-- SUBMIT BUTTON -->
		<button
			(click)="onSubmit()"
			[disabled]="submitDisabled"
			mat-raised-button
			color="primary"
			type="button"
		>
			<mat-icon matPrefix>add</mat-icon>Add Match
		</button>
	`,
	styles: `
		:host {
			display: grid;
		justify-items: center;
			h2 {
				text-align: center;
			}
			button {
				margin-top: 1rem;
			}
		}
	`,
})
export class AddNewMatchComponent {
	private matchService = inject(MatchService);
	private playerService = inject(PlayerService);

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
	public submitDisabled: boolean = true;

	private updateSubmitDisabled(): void {
		this.submitDisabled = Boolean(
			this.matchupError ||
				this.set1error ||
				this.set2error ||
				this.set3error ||
				(this.set4visibility && this.set4error) ||
				(this.set5visibility && this.set5error)
		);
	}

	public updatePlayer(matchupData: MatchupData): void {
		this.playerHome = matchupData.playerHome;
		this.playerAway = matchupData.playerAway;
		this.matchupError = matchupData.error;
		this.updateSubmitDisabled();
	}

	public updateScoreAndStructure(setData: SetData): void {
		this.updateSets(setData);
		this.updateFormStructure();
	}

	private updateSets(setData: SetData): void {
		switch (setData.setIndex) {
			case 1: {
				this.set1error = setData.error;
				this.set1HomeScore = setData.scoreHome;
				this.set1AwayScore = setData.scoreAway;
				break;
			}
			case 2: {
				this.set2error = setData.error;
				this.set2HomeScore = setData.scoreHome;
				this.set2AwayScore = setData.scoreAway;
				break;
			}
			case 3: {
				this.set3error = setData.error;
				this.set3HomeScore = setData.scoreHome;
				this.set3AwayScore = setData.scoreAway;
				break;
			}
			case 4: {
				this.set4error = setData.error;
				this.set4HomeScore = setData.scoreHome;
				this.set4AwayScore = setData.scoreAway;
				break;
			}
			case 5: {
				this.set5error = setData.error;
				this.set5HomeScore = setData.scoreHome;
				this.set5AwayScore = setData.scoreAway;
				break;
			}
		}

		this.updateSubmitDisabled();
	}

	private updateFormStructure(): void {
		if (
			// check if first 3 sets have all inputs filled and no validation errors
			// set 1
			this.set1HomeScore !== undefined &&
			this.set1HomeScore >= 0 &&
			this.set1AwayScore !== undefined &&
			this.set1AwayScore >= 0 &&
			!this.set1error &&
			// set 2
			this.set2HomeScore !== undefined &&
			this.set2HomeScore >= 0 &&
			this.set2AwayScore !== undefined &&
			this.set2AwayScore >= 0 &&
			!this.set2error &&
			// set 3
			this.set3HomeScore !== undefined &&
			this.set3HomeScore >= 0 &&
			this.set3AwayScore !== undefined &&
			this.set3AwayScore >= 0 &&
			!this.set3error
		) {
			if (
				// check if first 3 sets were won by the same player
				(this.set1HomeScore > this.set1AwayScore &&
					!this.set1error && // set 1
					this.set2HomeScore > this.set2AwayScore &&
					!this.set2error && // set 2
					this.set3HomeScore > this.set3AwayScore &&
					!this.set3error) || // set 3
				(this.set1HomeScore < this.set1AwayScore &&
					!this.set1error && // set 1
					this.set2HomeScore < this.set2AwayScore &&
					!this.set2error && // set 2
					this.set3HomeScore < this.set3AwayScore &&
					!this.set3error) // set 3
			) {
				// match ended in 3 sets
				this.set4visibility = false;
				this.set5visibility = false;
			} else {
				// set 4 needs to be played
				this.set4visibility =
					!this.set1error && !this.set2error && !this.set3error;
				if (
					// check if set 4 has all inputs filled and no validation error
					this.set4HomeScore !== undefined &&
					this.set4HomeScore >= 0 &&
					this.set4AwayScore !== undefined &&
					this.set4AwayScore >= 0 &&
					!this.set4error &&
					// check if, after 4 sets, playerHome did NOT
					// win exactly 2 sets (result is NOT 2:2)
					Number(this.set1HomeScore > this.set1AwayScore) +
						Number(this.set2HomeScore > this.set2AwayScore) +
						Number(this.set3HomeScore > this.set3AwayScore) +
						Number(this.set4HomeScore > this.set4AwayScore) !==
						2
				) {
					// match ended in 4 sets
					this.set5visibility = false;
				} else {
					// set 5 needs to be played
					if (
						// check if set 4 is finished and valid
						!this.set4error
					) {
						this.set5visibility =
							!this.set1error &&
							!this.set2error &&
							!this.set3error &&
							!this.set4error;
					}
				}
			}
		}

		this.updateSubmitDisabled();
	}

	public onSubmit(): void {
		const newMatchData: AddNewMatch = {
			playerHome: this.playerHome,
			playerAway: this.playerAway,
			set1HomeScore: this.set1HomeScore,
			set1AwayScore: this.set1AwayScore,
			set2HomeScore: this.set2HomeScore,
			set2AwayScore: this.set2AwayScore,
			set3HomeScore: this.set3HomeScore,
			set3AwayScore: this.set3AwayScore,
		};
		if (
			//check errors for matchup and first 3 sets
			!this.matchupError &&
			!this.set1error &&
			!this.set2error &&
			!this.set3error
		) {
			if (!this.set4error) {
				if (!this.set5error) {
					// 5 sets were played
					newMatchData.set4HomeScore = this.set4HomeScore;
					newMatchData.set4AwayScore = this.set4AwayScore;
					newMatchData.set5HomeScore = this.set5HomeScore;
					newMatchData.set5AwayScore = this.set5AwayScore;
					this.matchService.addNewMatch(newMatchData);
				} else {
					// 4 sets were played
					newMatchData.set4HomeScore = this.set4HomeScore;
					newMatchData.set4AwayScore = this.set4AwayScore;
					this.matchService.addNewMatch(newMatchData);
				}
			} else {
				// 3 sets were played
				this.matchService.addNewMatch(newMatchData);
			}
		}
	}
}
