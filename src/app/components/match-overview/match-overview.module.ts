import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatchOverviewComponent } from "./match-overview.component";

@NgModule({
	declarations: [MatchOverviewComponent],
	imports: [CommonModule],
	exports: [MatchOverviewComponent],
})
export class MatchOverviewModule {}
