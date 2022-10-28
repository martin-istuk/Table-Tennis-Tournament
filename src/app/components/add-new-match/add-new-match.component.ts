import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Player } from "src/app/interfaces/player.model";

import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";
import { nameMatchValidator } from "src/app/validators/name-match-validator.directive";

@Component({
	selector: "app-add-new-match",
	templateUrl: "./add-new-match.component.html",
	styleUrls: ["./add-new-match.component.scss"],
})
export class AddNewMatchComponent {
	constructor(
		private matchService: MatchService,
		private playerService: PlayerService,
		private formBuilder: FormBuilder
	) {}

	public addNewMatchForm: FormGroup = this.formBuilder.group(
		{
			playerHome: ["", [Validators.required]],
			playerAway: ["", [Validators.required]],
		},
		{
			updateOn: "change",
			validators: [nameMatchValidator("playerHome", "playerAway")],
		}
	);

	public checkNameMatch() {
		return (
			this.addNewMatchForm.getError("match") &&
			this.addNewMatchForm.get("playerAway")?.touched
		);
	}

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;
}
