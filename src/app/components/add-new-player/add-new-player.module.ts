import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddNewPlayerComponent } from "./add-new-player.component";

@NgModule({
	declarations: [AddNewPlayerComponent],
	imports: [CommonModule],
	exports: [AddNewPlayerComponent],
})
export class AddNewPlayerModule {}
