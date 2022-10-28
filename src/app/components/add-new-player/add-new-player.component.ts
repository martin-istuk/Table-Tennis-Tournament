import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Observable, Subscription } from "rxjs";

import { Player } from "src/app/interfaces/player.model";
import { MatchService } from "src/app/services/match/match.service";
import { PlayerService } from "src/app/services/player/player.service";

@Component({
	selector: "app-add-new-player",
	templateUrl: "./add-new-player.component.html",
	styleUrls: ["./add-new-player.component.scss"],
})
export class AddNewPlayerComponent implements OnDestroy {
	constructor(
		private matchService: MatchService,
		private playerService: PlayerService,
		private formBuilder: FormBuilder,
		private router: Router
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

	private subscription?: Subscription;

	public onSubmit(event: Event): void {
		event.preventDefault();

		this.subscription = this.playerService
			.addNewPlayer(
				this.addNewPlayerForm.controls["name"].value,
				this.addNewPlayerForm.controls["age"].value
			)
			.subscribe({
				next: () => {
					this.router.navigate(["standings"]);
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
