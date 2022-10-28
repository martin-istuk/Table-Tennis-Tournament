import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { AddNewPlayerComponent } from "./add-new-player.component";

@NgModule({
	declarations: [AddNewPlayerComponent],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
	],
	exports: [AddNewPlayerComponent],
})
export class AddNewPlayerModule {}
