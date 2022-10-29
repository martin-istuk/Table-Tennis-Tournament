import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";

import { MatchupComponent } from "./matchup.component";

@NgModule({
	declarations: [MatchupComponent],
	imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatIconModule],
	exports: [MatchupComponent],
})
export class MatchupModule {}
