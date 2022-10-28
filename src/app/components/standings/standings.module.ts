import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";

import { AddNewPlayerModule } from "../add-new-player/add-new-player.module";
import { StandingsComponent } from "./standings.component";

@NgModule({
	declarations: [StandingsComponent],
	imports: [
		CommonModule,
		RouterModule,
		AddNewPlayerModule,
		MatButtonModule,
		MatIconModule,
		MatTableModule,
	],
	exports: [StandingsComponent],
})
export class StandingsModule {}
