import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { initializeApp } from "firebase/app";

import { AppRoutingModule } from "./app-routing.module";
import { MainLayoutModule } from "./main-layout/main-layout.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const firebaseConfig = {
	apiKey: "AIzaSyCj9TRp6vIcemUwgNC1w4oTX-3yfN7rME4",
	authDomain: "table-tennis-tournament-df94a.firebaseapp.com",
	projectId: "table-tennis-tournament-df94a",
	storageBucket: "table-tennis-tournament-df94a.appspot.com",
	messagingSenderId: "326049775061",
	appId: "1:326049775061:web:61faf8ea33337a5235515c",
};

const firebaseApp = initializeApp(firebaseConfig);

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MainLayoutModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
