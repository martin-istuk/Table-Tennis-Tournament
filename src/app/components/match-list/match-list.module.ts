import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";

import { AddNewMatchModule } from "../add-new-match/add-new-match.module";
import { MatchListComponent } from "./match-list.component";

@NgModule({
	declarations: [MatchListComponent],
	imports: [
		CommonModule,
		AddNewMatchModule,
		MatButtonModule,
		MatIconModule,
		MatTableModule,
	],
	exports: [MatchListComponent],
})
export class MatchListModule {}
