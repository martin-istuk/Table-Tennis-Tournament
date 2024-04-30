import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

import { Observable } from "rxjs";

import { Player } from "src/app/interfaces/player.model";
import { PlayerService } from "src/app/services/player/player.service";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: "app-add-new-player",
    template: `
		<h2>Add new player</h2>

		<form [formGroup]="addNewPlayerForm">
			<mat-form-field appearance="outline">
				<mat-label>Name</mat-label>
			<input matInput formControlName="name" required>
			<mat-icon matPrefix>sentiment_very_satisfied</mat-icon>
			</mat-form-field>

			<mat-form-field appearance="outline">
				<mat-label>Age</mat-label>
			<input matInput formControlName="age" type="number" min="1" required>
			<mat-icon matPrefix>sentiment_very_satisfied</mat-icon>
			</mat-form-field>

			<button [disabled]="addNewPlayerForm.invalid" (click)="onSubmit($event)" mat-raised-button color="primary" type="button"><mat-icon matPrefix>add</mat-icon>Add Player</button>
		</form>
	`,
    styles: `
		:host {
			h2 {
				text-align: center;
			}
			width: 60vw;
			max-width: 300px;
			margin: auto;
			display: block;
			form {
				display: grid;
				button {
					height: 56px;
				}
			}
		}
	`,
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule]
})
export class AddNewPlayerComponent {
	private playerService = inject(PlayerService);
	private formBuilder = inject(FormBuilder);

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