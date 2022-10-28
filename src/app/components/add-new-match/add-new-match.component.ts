import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Player } from "src/app/interfaces/player.model";

import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";

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
		}
	);

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;

}