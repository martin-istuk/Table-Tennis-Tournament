import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

import { MainLayoutComponent } from "./main-layout.component";
import { AddNewMatchModule } from "../components/add-new-match/add-new-match.module";
import { AddNewPlayerModule } from "../components/add-new-player/add-new-player.module";
import { MatchListModule } from "../components/match-list/match-list.module";
import { MatchOverviewModule } from "../components/match-overview/match-overview.module";
import { PlayerOverviewModule } from "../components/player-overview/player-overview.module";
import { StandingsModule } from "../components/standings/standings.module";

@NgModule({
	declarations: [MainLayoutComponent],
	imports: [
		CommonModule,
		RouterModule,
		AddNewMatchModule,
		AddNewPlayerModule,
		MatchListModule,
		MatchOverviewModule,
		PlayerOverviewModule,
		StandingsModule,
		MatToolbarModule,
		MatButtonModule,
	],
	exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
