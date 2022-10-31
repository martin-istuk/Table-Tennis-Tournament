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
import { SetData } from "src/app/interfaces/set-data.model";

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
		return this.setForm.getError("setError");
		// &&
		// this.setForm.get("scoreHome")?.dirty &&
		// this.setForm.get("scoreAway")?.dirty
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