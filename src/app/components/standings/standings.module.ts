import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StandingsComponent } from "./standings.component";

@NgModule({
	declarations: [StandingsComponent],
	imports: [CommonModule],
	exports: [StandingsComponent],
})
export class StandingsModule {}
