import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameMatchValidator(
	playerHomeInputTag: string,
	playerAwayInputTag: string
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const playerHome = control.get(playerHomeInputTag);
		const playerAway = control.get(playerAwayInputTag);

		return playerHome &&
			playerAway &&
			playerHome.touched &&
			playerAway.touched &&
			playerHome.value !== playerAway.value
			? null
			: { match: true };
	};
}
