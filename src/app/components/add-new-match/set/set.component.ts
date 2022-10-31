import {
	Component,
	OnDestroy,
	Input,
	Output,
	EventEmitter,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Subscription } from "rxjs";

import { setScoreValidator } from "src/app/validators/set-score-validator.directive";

@Component({
	selector: "app-set",
	templateUrl: "./set.component.html",
	styleUrls: ["./set.component.scss"],
})
export class SetComponent implements OnDestroy {
	constructor(private formBuilder: FormBuilder) {}

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
		return (
			this.setForm.getError("setError")
			// &&
			// this.setForm.get("scoreHome")?.dirty &&
			// this.setForm.get("scoreAway")?.dirty
		);
	}

	@Input() setIndex?: number;

	@Output() scoreChangeEvent = new EventEmitter<string>();

	private homeScoreSubscription: Subscription = this.setForm.controls[
		"scoreHome"
	].valueChanges.subscribe({
		next: (value: string) => {
			this.setForm.updateValueAndValidity();
			const errorCheck: number = Number(this.checkPtsDifferenceError());
			this.scoreChangeEvent.emit(
				"set" + this.setIndex + "error" + errorCheck + "home" + value
			);
		},
	});

	private awayScoreSubscription: Subscription = this.setForm.controls[
		"scoreAway"
	].valueChanges.subscribe({
		next: (value: string) => {
			this.setForm.updateValueAndValidity();
			const errorCheck: number = Number(this.checkPtsDifferenceError());
			this.scoreChangeEvent.emit(
				"set" + this.setIndex + "error" + errorCheck + "away" + value
			);
		},
	});

	ngOnDestroy(): void {
		this.homeScoreSubscription?.unsubscribe();
		this.awayScoreSubscription?.unsubscribe();
	}
}
