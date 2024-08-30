import { Component, Output, EventEmitter, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	FormBuilder,
	FormGroup,
	Validators,
	ReactiveFormsModule,
} from "@angular/forms";

import { Observable, Subscription } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

import { nameMatchValidator } from "src/app/validators/name-match-validator.directive";
import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";
import { MatchupData } from "src/app/interfaces/matchup-data.type";

@Component({
	selector: "app-matchup",
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatOptionModule,
		MatIconModule,
	],
	template: `
		<h3>Matchup</h3>

		<form [formGroup]="matchForm">
			<mat-form-field appearance="outline">
				<mat-label>Player 1</mat-label>
				<mat-select formControlName="playerHome">
					<mat-option
						*ngFor="let player of players$ | async"
						[value]="player.name"
						>{{ player.name }}
					</mat-option>
				</mat-select>
				<mat-icon matPrefix>person</mat-icon>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<mat-label>Player 2</mat-label>
				<mat-select formControlName="playerAway">
					<mat-option
						*ngFor="let player of players$ | async"
						[value]="player.name"
					>
						{{ player.name }}
					</mat-option>
				</mat-select>
				<mat-icon matPrefix>person</mat-icon>
			</mat-form-field>
		</form>

		@if (checkNameMatchError()) {
		<p class="error">Matchup must contain two different players!</p>
		}
	`,
	styles: `
		:host {
			display: grid;
			justify-items: center;
			width: 60%;
			h3, p {
				text-align: center;
			}
			h3 {
				margin-bottom: 0;
			}
			form {
				display: grid;
				grid-template-columns: auto auto;
				justify-items: center;
				mat-form-field {
					width: 150px;
					padding: 3px;
					::ng-deep .mat-form-field-wrapper {
						padding-bottom: 0;
					}
				}
			}
			.error {
				color: red;
				font-weight: bold;
				margin-bottom: 1rem;
			}
			@media only screen and (max-width: 600px) {
				form {
					grid-template-columns: auto;
				}
			}
		}
	`,
})
export class MatchupComponent {
	private formBuilder = inject(FormBuilder);
	private playerService = inject(PlayerService);

	public matchForm: FormGroup = this.formBuilder.group(
		{
			playerHome: ["", [Validators.required]],
			playerAway: ["", [Validators.required]],
		},
		{
			validators: [nameMatchValidator("playerHome", "playerAway")],
		}
	);

	public checkNameMatchError(): boolean {
		return (
			this.matchForm.getError("matchupError") &&
			(this.matchForm.get("playerHome")?.dirty ||
				this.matchForm.get("playerAway")?.dirty)
		);
	}

	public players$: Observable<Array<Player>> = this.playerService.playerArray$;

	@Output() playerChangeEvent = new EventEmitter<MatchupData>();

	private subscription: Subscription = this.matchForm.valueChanges.subscribe({
		next: () => {
			this.matchForm.updateValueAndValidity({ emitEvent: false });
			const matchup: MatchupData = {
				playerHome: this.matchForm.controls["playerHome"].value,
				playerAway: this.matchForm.controls["playerAway"].value,
				error: Boolean(this.checkNameMatchError()),
			};
			this.playerChangeEvent.emit(matchup);
		},
	});

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
