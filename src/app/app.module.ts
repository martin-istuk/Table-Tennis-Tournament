import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { MainLayoutModule } from "./main-layout/main-layout.module";
import { AppComponent } from "./app.component";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, MainLayoutModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
