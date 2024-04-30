import {
	Component,
	OnDestroy,
	Input,
	Output,
	EventEmitter,
	inject,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

import { Subscription } from "rxjs";

import { setScoreValidator } from "src/app/validators/set-score-validator.directive";
import { SetData } from "src/app/interfaces/set-data.type";
import { NgIf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: "app-set",
    template: `
		<h3>Set {{ setIndex }}</h3>

		<form [formGroup]="setForm">
			<mat-form-field appearance="outline">
				<input
					matInput
					formControlName="scoreHome"
					type="number"
					min="0"
				/>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<input
					matInput
					formControlName="scoreAway"
					type="number"
					min="0"
				/>
			</mat-form-field>
		</form>

		<p *ngIf="checkPtsDifferenceError()" class="error">
			Set must end with winning player gaining 11 points with at least 2 point margin --OR-- by gaining more than 11 points with exactly 2 point margin.
		</p>
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
					width: 56px;
					text-align: center;
					font-weight: bold;
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
		}
	`,
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf]
})
export class SetComponent implements OnDestroy {
	private formBuilder = inject(FormBuilder);

	public setForm: FormGroup = this.formBuilder.group(
		{
			scoreHome: [0, [Validators.required, Validators.minLength(1)]],
			scoreAway: [0, [Validators.required, Validators.minLength(1)]],
		},
		{
			validators: [setScoreValidator("scoreHome", "scoreAway")],
		}
	);

	public checkPtsDifferenceError(): boolean {
		return this.setForm.getError("setError") &&
		(
			this.setForm.get("scoreHome")?.dirty ||
			this.setForm.get("scoreAway")?.dirty
		)
	}

	@Input() setIndex?: number;

	@Output() scoreChangeEvent = new EventEmitter<SetData>();

	private subscription: Subscription = this.setForm.valueChanges.subscribe({
		next: () => {
			this.setForm.updateValueAndValidity({ emitEvent: false });
			const setData: SetData = {
				setIndex: Number(this.setIndex),
				scoreHome: this.setForm.controls["scoreHome"].value,
				scoreAway: this.setForm.controls["scoreAway"].value,
				error: Boolean(this.checkPtsDifferenceError()),
			};
			this.scoreChangeEvent.emit(setData);
		},
	});

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}