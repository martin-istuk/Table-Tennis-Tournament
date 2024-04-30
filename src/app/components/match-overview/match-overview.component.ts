import { Component, inject } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Observable, map, switchMap, EMPTY } from "rxjs";

import { MatchService } from "src/app/services/match/match.service";
import { Match } from "src/app/interfaces/match.model";
import { NgIf, NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "app-match-overview",
    template: `
		<h2>Match ID</h2>
		<p>{{ (match$ | async)?.id }}</p>

		<h2>Matchup</h2>
		<p>{{ (match$ | async)?.playerHome }} -VS- {{ (match$ | async)?.playerAway }}</p>

		<h2>Score</h2>
		<div *ngIf="(match$ | async)?.score as score">
			<p>{{ score[0] }}:{{ score[1] }}</p>
		</div>

		<h2>Sets</h2>
		<div class="scoreSheet">
			<div>
				<p>&nbsp;</p>
				<p>{{ (match$ | async)?.playerHome }}</p>
				<p>{{ (match$ | async)?.playerAway }}</p>
			</div>
			<div class="scoreBox">
				<div *ngFor="let set of (match$ | async)?.sets; index as setIndex" class="column">
					<p class="setIndex">{{ "S" + (setIndex + 1) }}</p>
					<p *ngFor="let p of [].constructor(2); index as i">{{ set[i] }}</p>
				</div>
			</div>
		</div>
	`,
    styles: `
		:host {
			display: grid;
			grid-template-columns: auto;
			justify-items: center;
			h2 {
				margin-top: 1rem;
			}
			.scoreSheet {
				display: grid;
				grid-template-columns: auto auto;
				gap: 1rem;
				.scoreBox {
					display: grid;
					grid-template-columns: auto auto auto auto auto;
					gap: 1rem;
					justify-content: start;
					padding: 0.5rem 0;
					.column {
						display: grid;
						grid-template-columns: auto;
						gap: 0.5rem;
						justify-items: end;
						min-width: 30px;
						border-left: 1px solid Grey;
						p {
							margin: 0;
						}
						.setIndex {
							color: hsl(0, 0%, 60%);
							border-bottom: 1px solid Grey;
						}
					}
				}
			}
		}
	`,
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe]
})
export class MatchOverviewComponent {
	private route = inject(ActivatedRoute);
	private matchService = inject(MatchService);

	private routeId$: Observable<string | null> = this.route.paramMap.pipe(
		map((params: ParamMap) => params.get("id"))
	);

	public match$: Observable<Match | null> = this.routeId$.pipe(
		switchMap((id: string | null) => {
			if (!id) {
				return EMPTY;
			}
			return this.matchService.getMatchById(id);
		})
	);
}
