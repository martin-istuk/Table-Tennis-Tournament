import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { AddNewMatchComponent } from "./add-new-match.component";

@NgModule({
	declarations: [AddNewMatchComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatIconModule,
		MatIconModule,
		MatButtonModule,
	],
	exports: [AddNewMatchComponent],
})
export class AddNewMatchModule {}
