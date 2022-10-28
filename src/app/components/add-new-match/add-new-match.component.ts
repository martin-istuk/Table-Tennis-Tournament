import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Observable, Subscription } from "rxjs";

import { Player } from "src/app/interfaces/player.model";
import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";
import { nameMatchValidator } from "src/app/validators/name-match-validator.directive";
import { setScoreValidator } from "src/app/validators/set-score-validator.directive";

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

	public addNewMatchForm: FormGroup = this.formBuilder.group(
		{
			playerHome: ["", [Validators.required]],
			playerAway: ["", [Validators.required]],

			set1HomeScore: ["", [Validators.required]],
			set1AwayScore: ["", [Validators.required]],

			set2HomeScore: ["", [Validators.required]],
			set2AwayScore: ["", [Validators.required]],

			set3HomeScore: ["", [Validators.required]],
			set3AwayScore: ["", [Validators.required]],

			set4HomeScore: [""],
			set4AwayScore: [""],

			set5HomeScore: [""],
			set5AwayScore: [""],
		},
		{
			updateOn: "change",
			validators: [
				nameMatchValidator("playerHome", "playerAway"),
				setScoreValidator("set1HomeScore", "set1AwayScore"),
				setScoreValidator("set2HomeScore", "set2AwayScore"),
				setScoreValidator("set3HomeScore", "set3AwayScore"),
				setScoreValidator("set4HomeScore", "set4AwayScore"),
				setScoreValidator("set5HomeScore", "set5AwayScore"),
			],
		}
	);

	public checkNameMatchError() {
		return (
			this.addNewMatchForm.getError("match") &&
			this.addNewMatchForm.get("playerAway")?.touched
		);
	}

	public checkPtsDifferenceError() {
		return (
			this.addNewMatchForm.getError("pointDifference")
		);
	}

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;

	private subscription?: Subscription;

	public onSubmit(event: Event): void {
		event.preventDefault();

		this.subscription = this.playerService
			.addNewPlayer(
				this.addNewMatchForm.controls["playerHome"].value,
				this.addNewMatchForm.controls["playerAway"].value
			)
			.subscribe({
				next: () => {
					this.router.navigate([""]);
				},
				error: (error: Error) => {
					window.alert(error);
				},
			});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
