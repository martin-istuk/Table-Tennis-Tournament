import { enableProdMode, importProvidersFrom } from "@angular/core";

import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";
import { provideAnimations } from "@angular/platform-browser/animations";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { Routes, provideRouter } from "@angular/router";
import { AddNewMatchComponent } from "./app/components/add-new-match/add-new-match.component";
import { AddNewPlayerComponent } from "./app/components/add-new-player/add-new-player.component";
import { MatchListComponent } from "./app/components/match-list/match-list.component";
import { MatchOverviewComponent } from "./app/components/match-overview/match-overview.component";
import { PlayerOverviewComponent } from "./app/components/player-overview/player-overview.component";
import { PlayersComponent } from "./app/components/players/players.component";
import { MainLayoutComponent } from "./app/main-layout/main-layout.component";

if (environment.production) {
	enableProdMode();
}

const routes: Routes = [
	{
		path: "",
		component: MainLayoutComponent,
		children: [
			{ path: "", component: MatchListComponent },
			{ path: "add-new-match", component: AddNewMatchComponent },
			{ path: "match-overview/:id", component: MatchOverviewComponent },
			{ path: "players", component: PlayersComponent },
			{ path: "add-new-player", component: AddNewPlayerComponent },
			{ path: "player-overview/:id", component: PlayerOverviewComponent },
		],
	},
];

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(BrowserModule),
		provideAnimations(),
		provideRouter(routes),
	],
}).catch((err) => console.error(err));
