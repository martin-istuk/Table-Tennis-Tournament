import { Component, inject } from "@angular/core";

import { Observable } from "rxjs";

import { MatchService } from "src/app/services/match/match.service";
import { Match } from "src/app/interfaces/match.model";
import { MatTableModule } from "@angular/material/table";
import { NgIf, AsyncPipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-match-list",
    template: `
		<button
			mat-raised-button
			color="primary"
			class="addNew"
			[routerLink]="['/add-new-match']"
		>
			<mat-icon>add</mat-icon>Add New Match
		</button>

		<div *ngIf="matchList$ | async as matchList; else errorGettingData">
			<table mat-table [dataSource]="matchList">
				<!-- Match-Id Column -->
				<ng-container matColumnDef="id">
					<th mat-header-cell *matHeaderCellDef>Match ID</th>
					<td mat-cell *matCellDef="let match">
						<button
							mat-stroked-button
							[routerLink]="['/match-overview/' + match.id]"
							>{{ match.id }}
						</button>
					</td>
				</ng-container>

				<!-- Matchup Column -->
				<ng-container matColumnDef="matchup">
					<th mat-header-cell *matHeaderCellDef>Matchup</th>
					<td mat-cell *matCellDef="let match">
						<div class="column">
							<p>{{ match.playerHome }}</p>
							<p>{{ match.playerAway }}</p>
						</div>
					</td>
				</ng-container>

				<!-- Score Column -->
				<ng-container matColumnDef="score">
					<th mat-header-cell *matHeaderCellDef>Score</th>
					<td mat-cell *matCellDef="let match">
						<div class="column">
							<p>{{ match.score[0] }}</p>
							<p>{{ match.score[1] }}</p>
						</div>
					</td>
				</ng-container>

				<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
				<tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
			</table>
		</div>

		<ng-template #errorGettingData>
			<p class="error">Error getting data!</p>
		</ng-template>
	`,
    styles: `
		.addNew {
			margin: auto;
			display: block;
			margin-bottom: 1rem;
		}
		table {
		width: 100%;
			* {
				font-size: 1rem;
			}
			th {
				font-weight: bold;
				margin-right: 1rem;
			}
			.mat-column-id {
				padding-right: 5%;
			}
			.mat-column-matchup {
				padding-left: 5%;
				padding-right: 5%;
				text-align: left;
			}
			.mat-column-score {
				padding-left: 5%;
				text-align: center;
			}
			.column p {
				margin: 0.5rem 0;
			}
		}
	`,
    standalone: true,
    imports: [MatButtonModule, RouterLink, MatIconModule, NgIf, MatTableModule, AsyncPipe]
})
export class MatchListComponent {
	public matchService = inject(MatchService);

	public displayedColumns: Array<string> = [
		"id",
		"matchup",
		"score",
	];

	public matchList$: Observable<Array<Match>> = this.matchService.matchArray$;

	public addNewMatch(): void {}
}
