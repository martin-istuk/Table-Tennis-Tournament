import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function set5ScoreValidator(
	set1ScoreHomeInputTag: string,
	set1ScoreAwayInputTag: string,
	set2ScoreHomeInputTag: string,
	set2ScoreAwayInputTag: string,
	set3ScoreHomeInputTag: string,
	set3ScoreAwayInputTag: string,
	set4ScoreHomeInputTag: string,
	set4ScoreAwayInputTag: string,
	set5ScoreHomeInputTag: string,
	set5ScoreAwayInputTag: string
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
		const set5ScoreHome = control.get(set5ScoreHomeInputTag);
		const set5ScoreAway = control.get(set5ScoreAwayInputTag);

		return (
			// controls for first 4 sets exist
			set1ScoreHome && set1ScoreAway && set2ScoreHome && set2ScoreAway &&
			set3ScoreHome && set3ScoreAway && set4ScoreHome && set4ScoreAway &&
			(
				// player 1 has not won exactly 2 sets (result is not 2:2)
				(
					Number(set1ScoreHome.value > set1ScoreAway.value) +
					Number(set2ScoreHome.value > set2ScoreAway.value) +
					Number(set3ScoreHome.value > set3ScoreAway.value) +
					Number(set4ScoreHome.value > set4ScoreAway.value)
				) !== 2
			)
		)
		? null  // no error; match ended in first 4 sets
		: (
			// fifth set needs to be played
			(
				// controls for fifth set exist
				set5ScoreHome && set5ScoreAway &&
				(
					// end set if one player has 11 points and the other at most 9
					(set5ScoreHome.value === 11 && set5ScoreAway.value <= set5ScoreHome.value - 2) ||
					(set5ScoreAway.value === 11 && set5ScoreHome.value <= set5ScoreAway.value - 2) ||
					// end set if one player has more than 11 points and the other exactly 2 less
					(set5ScoreHome.value > 11 && set5ScoreAway.value === set5ScoreHome.value - 2) ||
					(set5ScoreAway.value > 11 && set5ScoreHome.value === set5ScoreAway.value - 2)
				)
			)
			? null  // no error; match ended in fifth set
			: { set5Error: true }  // error; fifth set has invalid input(s)
		);
	};
}