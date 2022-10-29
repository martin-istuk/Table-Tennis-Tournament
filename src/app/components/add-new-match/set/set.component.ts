import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";
import { setScoreValidator } from "src/app/validators/set-score-validator.directive";

@Component({
	selector: "app-set",
	templateUrl: "./set.component.html",
	styleUrls: ["./set.component.scss"],
})
export class SetComponent {
	constructor(
		private matchService: MatchService,
		private playerService: PlayerService,
		private formBuilder: FormBuilder,
		private router: Router
	) {}

	public setForm: FormGroup = this.formBuilder.group(
		{
			scoreHome: ["", [Validators.required]],
			scoreAway: ["", [Validators.required]],
		},
		{
			updateOn: "change",
			validators: [setScoreValidator("scoreHome", "scoreAway")],
		}
	);

	public checkPtsDifferenceError() {
		return (
			this.setForm.getError("pointDifference") &&
			this.setForm.get("scoreAway")?.touched
		);
	}

	@Input() setIndex?: number;
}
