import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";

import { Player } from "src/app/interfaces/player.model";
import { PlayerService } from "src/app/services/player/player.service";

@Component({
	selector: "app-add-new-player",
	templateUrl: "./add-new-player.component.html",
	styleUrls: ["./add-new-player.component.scss"],
})
export class AddNewPlayerComponent {
	constructor(
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

	public onSubmit(event: Event): void {
		event.preventDefault();

		const name: string = this.addNewPlayerForm.controls["name"].value;
		const age: number = this.addNewPlayerForm.controls["age"].value;

		if (this.playerService.checkNameAvailability(name)) {
			this.playerService.addNewPlayer(name, age);
		} else {
			window.alert("That name is already taken.")
		}
	}
}