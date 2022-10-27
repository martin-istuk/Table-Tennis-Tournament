import { Component } from "@angular/core";

@Component({
	selector: "app-main-layout",
	templateUrl: "./main-layout.component.html",
	styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent {
	public readonly navigationLinks: Array<{
		url: string, title: string
	}> = [
		{
			url: "",
			title: "Matches"
		},
		{
			url: "standings",
			title: "Standings"
		}
	];
}
