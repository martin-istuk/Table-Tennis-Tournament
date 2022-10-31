import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable, Subscription } from "rxjs";

import { nameMatchValidator } from "src/app/validators/name-match-validator.directive";
import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";

@Component({
	selector: "app-matchup",
	templateUrl: "./matchup.component.html",
	styleUrls: ["./matchup.component.scss"],
})
export class MatchupComponent {
	constructor(
		private formBuilder: FormBuilder,
		private playerService: PlayerService
	) {}

	public matchForm: FormGroup = this.formBuilder.group(
		{
			playerHome: ["", [Validators.required]],
			playerAway: ["", [Validators.required]],
		},
		{
			validators: [nameMatchValidator("playerHome", "playerAway")]
		}
	);

	public checkNameMatchError(): boolean {
		return (
			this.matchForm.getError("matchupError")
			// &&
			// this.matchForm.get("playerHome")?.dirty &&
			// this.matchForm.get("playerAway")?.dirty
		);
	}

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;

	@Output() playerChangeEvent = new EventEmitter<string>();

	private playerHomeSubscription: Subscription = this.matchForm.controls["playerHome"].valueChanges.subscribe({
		next: (value: string) => {
			this.matchForm.updateValueAndValidity();
			const errorCheck: number = Number(this.checkNameMatchError());
			this.playerChangeEvent.emit("error" + errorCheck + "home" + value);
		}
	});

	private playerAwaySubscription: Subscription = this.matchForm.controls["playerAway"].valueChanges.subscribe({
		next: (value: string) => {
			this.matchForm.updateValueAndValidity();
			const errorCheck: number = Number(this.checkNameMatchError());
			this.playerChangeEvent.emit("error" + errorCheck + "away" + value);
		}
	});

	ngOnDestroy(): void {
		this.playerHomeSubscription?.unsubscribe();
		this.playerAwaySubscription?.unsubscribe();
	}

}