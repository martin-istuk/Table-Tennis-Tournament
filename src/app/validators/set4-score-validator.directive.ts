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
		const set1ScoreHome = control.get(set1ScoreHomeInputTag);
		const set1ScoreAway = control.get(set1ScoreAwayInputTag);
		const set2ScoreHome = control.get(set2ScoreHomeInputTag);
		const set2ScoreAway = control.get(set2ScoreAwayInputTag);
		const set3ScoreHome = control.get(set3ScoreHomeInputTag);
		const set3ScoreAway = control.get(set3ScoreAwayInputTag);
		const set4ScoreHome = control.get(set4ScoreHomeInputTag);
		const set4ScoreAway = control.get(set4ScoreAwayInputTag);

		return (
			// controls for first 3 sets exist
			set1ScoreHome && set1ScoreAway && set2ScoreHome && set2ScoreAway &&
			set3ScoreHome && set3ScoreAway &&
			(
				(
					// player 1 won the match in 3 sets
					set1ScoreHome.value > set1ScoreAway.value &&
					set2ScoreHome.value > set2ScoreAway.value &&
					set3ScoreHome.value > set3ScoreAway.value
				) ||
				(
					// player 2 won the match in 3 sets
					set1ScoreHome.value < set1ScoreAway.value &&
					set2ScoreHome.value < set2ScoreAway.value &&
					set3ScoreHome.value < set3ScoreAway.value
				)
			)
		)
		? null  // no error; match ended in first 3 sets
		: (
			// fourth set needs to be played
			(
				// controls for fourth set exist
				set4ScoreHome && set4ScoreAway &&
				(
					// end set if one player has 11 points and the other at most 9
					(set4ScoreHome.value === 11 && set4ScoreAway.value <= set4ScoreHome.value - 2) ||
					(set4ScoreAway.value === 11 && set4ScoreHome.value <= set4ScoreAway.value - 2) ||
					// end set if one player has more than 11 points and the other exactly 2 less
					(set4ScoreHome.value > 11 && set4ScoreAway.value === set4ScoreHome.value - 2) ||
					(set4ScoreAway.value > 11 && set4ScoreHome.value === set4ScoreAway.value - 2)
				)
			)
			? null  // no error; match ended in fourth set
			: { set4Error: true }  // error; fourth set has invalid input(s)
		);
	};
}