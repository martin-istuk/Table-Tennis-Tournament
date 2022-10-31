import { Component, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
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
			scoreHome: ["", [Validators.required]],
			scoreAway: ["", [Validators.required]],
		},
		{
			validators: [setScoreValidator("scoreHome", "scoreAway")]
		}
	);

	public checkPtsDifferenceError() {
		return (
			this.setForm.getError("setError") &&
			this.setForm.get("scoreAway")?.touched
		);
	}

	@Input() setIndex?: number;

	@Output() homeScoreEvent = new EventEmitter<string>();
	private homeScoreSubscription: Subscription = this.setForm.controls["scoreHome"].valueChanges.subscribe({
		next: (value: string) => {
			this.homeScoreEvent.emit("set" + this.setIndex + value);
		}
	});

	@Output() awayScoreEvent = new EventEmitter<string>();
	private awayScoreSubscription: Subscription = this.setForm.controls["scoreAway"].valueChanges.subscribe({
		next: (value: string) => {
			this.awayScoreEvent.emit("set" + this.setIndex + value);
		}
	});

	ngOnDestroy(): void {
		this.homeScoreSubscription?.unsubscribe();
		this.awayScoreSubscription?.unsubscribe();
	}

}