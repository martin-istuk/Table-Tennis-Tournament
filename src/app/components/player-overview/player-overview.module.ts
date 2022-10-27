import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerOverviewComponent } from "./player-overview.component";

@NgModule({
	declarations: [PlayerOverviewComponent],
	imports: [CommonModule],
	exports: [PlayerOverviewComponent],
})
export class PlayerOverviewModule {}
