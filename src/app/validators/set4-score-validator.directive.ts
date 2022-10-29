import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function set4ScoreValidator(
	set1ScoreHomeInputTag: string,
	set1ScoreAwayInputTag: string,
	set2ScoreHomeInputTag: string,
	set2ScoreAwayInputTag: string,
	set3ScoreHomeInputTag: string,
	set3ScoreAwayInputTag: string,
	set4ScoreHomeInputTag: string,
	set4ScoreAwayInputTag: string
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const set4ScoreHome = control.get(set4ScoreHomeInputTag);
		const set4ScoreAway = control.get(set4ScoreAwayInputTag);

		return set4ScoreHome &&
			set4ScoreAway &&
			set4ScoreHome.value !== "" &&
			set4ScoreAway.value !== "" &&
			(
				// end set if one player has 11 points and the other at most 9
				(set4ScoreHome.value === 11 && set4ScoreAway.value <= set4ScoreHome.value - 2) ||
				(set4ScoreAway.value === 11 && set4ScoreHome.value <= set4ScoreAway.value - 2) ||
				// end set if one player has more than 11 points and the other exactly 2 less
				(set4ScoreHome.value > 11 && set4ScoreAway.value === set4ScoreHome.value - 2) ||
				(set4ScoreAway.value > 11 && set4ScoreHome.value === set4ScoreAway.value - 2)
			)
			? null
			: { pointDifference: true };
	};
}
