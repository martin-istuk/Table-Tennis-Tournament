import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
	selector: "app-main-layout",
	templateUrl: "./main-layout.component.html",
	styleUrls: ["./main-layout.component.scss"],
	standalone: true,
	imports: [
		MatToolbarModule,
		CommonModule,
		MatButtonModule,
		RouterLink,
		RouterLinkActive,
		RouterOutlet,
	],
})
export class MainLayoutComponent {
	public readonly navigationLinks: Array<{
		url: string;
		title: string;
	}> = [
		{
			url: "",
			title: "Matches",
		},
		{
			url: "players",
			title: "Players",
		},
	];
}
