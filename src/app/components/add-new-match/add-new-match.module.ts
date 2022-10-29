import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { MatchupModule } from "./matchup/matchup.module";
import { SetModule } from "./set/set.module";
import { AddNewMatchComponent } from "./add-new-match.component";

@NgModule({
	declarations: [AddNewMatchComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatchupModule,
		SetModule,
		MatIconModule,
		MatButtonModule,
	],
	exports: [AddNewMatchComponent],
})
export class AddNewMatchModule {}