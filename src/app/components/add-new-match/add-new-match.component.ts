import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Observable, Subscription } from "rxjs";

import { Player } from "src/app/interfaces/player.model";
import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";
import { nameMatchValidator } from "src/app/validators/name-match-validator.directive";
import { setScoreValidator } from "src/app/validators/set-score-validator.directive";
import { set4ScoreValidator } from "src/app/validators/set4-score-validator.directive";

@Component({
	selector: "app-add-new-match",
	templateUrl: "./add-new-match.component.html",
	styleUrls: ["./add-new-match.component.scss"],
})
export class AddNewMatchComponent implements OnDestroy {
	constructor(
		private matchService: MatchService,
		private playerService: PlayerService,
		private formBuilder: FormBuilder,
		private router: Router
	) {}

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;

	public addNewMatchForm: FormGroup = this.formBuilder.group(
		{
			playerHome: ["", [Validators.required]],
			playerAway: ["", [Validators.required]],
			set1scoreHome: ["", [Validators.required]],
			set1scoreAway: ["", [Validators.required]],
			set2scoreHome: ["", [Validators.required]],
			set2scoreAway: ["", [Validators.required]],
			set3scoreHome: ["", [Validators.required]],
			set3scoreAway: ["", [Validators.required]],
			set4scoreHome: [""],
			set4scoreAway: [""],
			set5scoreHome: [""],
			set5scoreAway: [""],
		},
		{
			updateOn: "change",
			validators: [
				nameMatchValidator("playerHome", "playerAway"),
				setScoreValidator("set1scoreHome", "set1scoreAway"),
				setScoreValidator("set2scoreHome", "set2scoreAway"),
				setScoreValidator("set3scoreHome", "set3scoreAway"),
				// set4ScoreValidator(
				// 	"set1scoreHome", "set1scoreAway", "set2scoreHome", "set2scoreAway", "set3scoreHome", "set3scoreAway", "set4scoreHome", "set4scoreAway"
				// ),
				setScoreValidator("set4scoreHome", "set4scoreAway"),
				setScoreValidator("set5scoreHome", "set5scoreAway"),
			],
		}
	);

	public checkNameMatchError() {
		return (
			this.addNewMatchForm.getError("match") &&
			this.addNewMatchForm.get("playerHome")?.touched &&
			this.addNewMatchForm.get("playerAway")?.touched
		);
	}

	public checkPtsDifferenceError(setIndex: number) {
		return (
			this.addNewMatchForm.getError("pointDifference") &&
			this.addNewMatchForm.get("set" + setIndex + "scoreAway")?.touched
		);
	}

	public playerHome?: string;
	public playerAway?: string;

	public set1HomeScore?: number;
	public set1AwayScore?: number;

	private subscription?: Subscription;

	public onSubmit(event: Event): void {
		event.preventDefault();

		if (this.playerHome && this.playerAway) {
			this.subscription = this.matchService
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
		this.subscription?.unsubscribe();
	}
}
