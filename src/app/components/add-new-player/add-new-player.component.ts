import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";

import { Player } from "src/app/interfaces/player.model";
import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";

@Component({
	selector: "app-add-new-player",
	templateUrl: "./add-new-player.component.html",
	styleUrls: ["./add-new-player.component.scss"],
})
export class AddNewPlayerComponent {
	constructor(
		private matchService: MatchService,
		private playerService: PlayerService,
		private formBuilder: FormBuilder
	) {}

	public addNewPlayerForm: FormGroup = this.formBuilder.group(
		{
			name: ["", [Validators.required, Validators.minLength(3)]],
			age: ["", [Validators.required]],
		},
		{
			updateOn: "change",
		}
	);

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;
}
