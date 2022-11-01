import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable, Subscription } from "rxjs";

import { nameMatchValidator } from "src/app/validators/name-match-validator.directive";
import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";
import { MatchupData } from "src/app/interfaces/matchup-data.type";

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
			this.matchForm.getError("matchupError") &&
			(
				this.matchForm.get("playerHome")?.dirty ||
				this.matchForm.get("playerAway")?.dirty
			)
		);
	}

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;

	@Output() playerChangeEvent = new EventEmitter<MatchupData>();

	private subscription: Subscription = this.matchForm.valueChanges.subscribe({
		next: () => {
			this.matchForm.updateValueAndValidity( {emitEvent: false} );
			const matchup: MatchupData = {
				playerHome: this.matchForm.controls["playerHome"].value,
				playerAway: this.matchForm.controls["playerAway"].value,
				error: Boolean(this.checkNameMatchError())
			}
			this.playerChangeEvent.emit(matchup);
		}
	});

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

}