import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddNewMatchComponent } from "./components/add-new-match/add-new-match.component";
import { AddNewPlayerComponent } from "./components/add-new-player/add-new-player.component";
import { MatchListComponent } from "./components/match-list/match-list.component";
import { MatchOverviewComponent } from "./components/match-overview/match-overview.component";
import { PlayerOverviewComponent } from "./components/player-overview/player-overview.component";
import { StandingsComponent } from "./components/standings/standings.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";

const routes: Routes = [
	{
		path: "",
		component: MainLayoutComponent,
		children: [
			{ path: "", component: MatchListComponent },
			{ path: "add-new-match", component: AddNewMatchComponent },
			{ path: "match-overview/:id", component: MatchOverviewComponent },
			{ path: "standings", component: StandingsComponent },
			{ path: "add-new-player", component: AddNewPlayerComponent },
			{ path: "player-overview/:id", component: PlayerOverviewComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
