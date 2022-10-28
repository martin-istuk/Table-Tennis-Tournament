import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameMatchValidator(
	playerHome: string,
	playerAway: string
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const playerHomeInput = control.get(playerHome);
		const playerAwayInput = control.get(playerAway);

		return playerHomeInput &&
			playerAwayInput &&
			playerHomeInput.value === playerAwayInput.value
			? { match: true }
			: null;
	};
}
