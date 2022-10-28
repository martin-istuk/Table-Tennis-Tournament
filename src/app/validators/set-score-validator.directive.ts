import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function setScoreValidator(
	scoreHome: string,
	scoreAway: string
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const sh = control.get(scoreHome);
		const sa = control.get(scoreAway);

		return sh && sa &&
			(
				(sh.value < 11 && sa.value < 11) ||
				(sh.value >= 11 && sa.value > sh.value - 2) ||
				(sa.value >= 11 && sh.value > sa.value - 2)
			)
			? { pointDifference: true }
			: null;
	};
}
