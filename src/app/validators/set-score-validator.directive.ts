import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function setScoreValidator(
	setScoreHomeInputTag: string,
	setScoreAwayInputTag: string
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const scoreHome = control.get(setScoreHomeInputTag);
		const scoreAway = control.get(setScoreAwayInputTag);

		return scoreHome &&
			scoreAway &&
			(
				// end set if one player has 11 points and the other at most 9
				(scoreHome.value === 11 && scoreAway.value <= scoreHome.value - 2) ||
				(scoreAway.value === 11 && scoreHome.value <= scoreAway.value - 2) ||
				// end set if one player has more than 11 points and the other exactly 2 less
				(scoreHome.value > 11 && scoreAway.value === scoreHome.value - 2) ||
				(scoreAway.value > 11 && scoreHome.value === scoreAway.value - 2)
			)
			? null
			: { setError: true };
	};
}