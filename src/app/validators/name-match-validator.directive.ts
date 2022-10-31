import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameMatchValidator(
	playerHomeInputTag: string,
	playerAwayInputTag: string
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const playerHome = control.get(playerHomeInputTag);
		const playerAway = control.get(playerAwayInputTag);

		return (
			playerHome &&
			playerAway &&
			playerHome.value !== "" &&
			playerAway.value !== "" &&
			playerHome.value !== playerAway.value
			? null
			: { matchupError: true }
		);
	};
}