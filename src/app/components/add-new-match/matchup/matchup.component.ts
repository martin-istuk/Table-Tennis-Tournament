import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";

import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";
import { nameMatchValidator } from "src/app/validators/name-match-validator.directive";

@Component({
	selector: "app-matchup",
	templateUrl: "./matchup.component.html",
	styleUrls: ["./matchup.component.scss"],
})
export class MatchupComponent {
	constructor(
		private playerService: PlayerService,
		private formBuilder: FormBuilder
	) {}

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;

	public matchupForm: FormGroup = this.formBuilder.group(
		{
			playerHome: ["", [Validators.required]],
			playerAway: ["", [Validators.required]],
		},
		{
			updateOn: "change",
			validators: [nameMatchValidator("playerHome", "playerAway")],
		}
	);

	public checkNameMatchError() {
		return (
			this.matchupForm.getError("match") &&
			this.matchupForm.get("playerAway")?.touched
		);
	}

	public playerHome?: string;
	public playerAway?: string;
	@Output() playerHomeEmitter = new EventEmitter<string>();
	@Output() playerAwayEmitter = new EventEmitter<string>();

	public emitPlayerHome(): void {
		this.playerHomeEmitter.emit(this.playerHome);
	}
	public emitPlayerAway(): void {
		this.playerAwayEmitter.emit(this.playerAway);
	}
}
