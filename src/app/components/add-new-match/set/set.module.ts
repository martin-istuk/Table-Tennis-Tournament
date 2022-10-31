import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";

import { SetComponent } from "./set.component";

@NgModule({
	declarations: [SetComponent],
	imports: [CommonModule, ReactiveFormsModule, MatInputModule],
	exports: [SetComponent],
})
export class SetModule {}
