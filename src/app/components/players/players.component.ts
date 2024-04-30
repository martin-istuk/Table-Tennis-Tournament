import { Component, inject } from "@angular/core";

import { Observable } from "rxjs";

import { PlayerService } from "src/app/services/player/player.service";
import { Player } from "src/app/interfaces/player.model";
import { MatTableModule } from "@angular/material/table";
import { NgIf, AsyncPipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "app-players",
	template: `
		<button
			mat-raised-button
			color="primary"
			class="addNew"
			[routerLink]="['/add-new-player']"
		>
			<mat-icon>add</mat-icon>Add New Player
		</button>

		<div *ngIf="playerList$ | async as playerList; else errorGettingData">
			<table mat-table [dataSource]="playerList">
				<!-- Player-ID Column -->
				<ng-container matColumnDef="id">
					<th mat-header-cell *matHeaderCellDef>Player ID</th>
					<td mat-cell *matCellDef="let player">
						<button
							mat-stroked-button
							[routerLink]="['/player-overview/' + player.id]"
							>{{ player.id }}
						</button>
					</td>
				</ng-container>

				<!-- Player-Name Column -->
				<ng-container matColumnDef="name">
					<th mat-header-cell *matHeaderCellDef>Player Name</th>
					<td mat-cell *matCellDef="let player">{{ player.name }}</td>
				</ng-container>

				<!-- Age Column -->
				<ng-container matColumnDef="age">
					<th mat-header-cell *matHeaderCellDef>Age</th>
					<td mat-cell *matCellDef="let player">{{ player.age }}</td>
				</ng-container>

				<!-- Score Column -->
				<ng-container matColumnDef="gamesPlayed">
					<th mat-header-cell *matHeaderCellDef>Games Played</th>
					<td mat-cell *matCellDef="let player">{{ player.matchIds.length }}</td>
				</ng-container>

				<!-- Player-Away Column -->
				<ng-container matColumnDef="setWins">
					<th mat-header-cell *matHeaderCellDef>Set Wins</th>
					<td mat-cell *matCellDef="let player">{{ player.setWins }}</td>
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
			.mat-column-name {
				padding-left: 5%;
				padding-right: 5%;
			}
			.mat-column-age {
				padding-left: 5%;
				padding-right: 5%;
				text-align: right;
			}
			.mat-column-gamesPlayed {
				padding-left: 5%;
				padding-right: 5%;
				text-align: center;
			}
			.mat-column-setWins {
				padding-left: 5%;
				text-align: center;
			}
		}
		.error {
			color: red;
		}
	`,
	standalone: true,
	imports: [MatButtonModule, RouterLink, MatIconModule, NgIf, MatTableModule, AsyncPipe]
})
export class PlayersComponent {
	private playerService = inject(PlayerService);

	public displayedColumns: Array<string> = [
		"id",
		"name",
		"age",
		"gamesPlayed",
		"setWins",
	];

	public playerList$: Observable<Array<Player>> =
		this.playerService.playerArray$;
}
