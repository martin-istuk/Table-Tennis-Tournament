import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
	selector: "app-main-layout",
	template: `
		<mat-toolbar color="primary">
			<nav>
				<button
					*ngFor="let link of navigationLinks"
					mat-raised-button
					[routerLink]="link.url"
					[routerLinkActive]="'active'"
					[routerLinkActiveOptions]="{ exact: true }"
					>{{ link.title }}
				</button>
			</nav>
		</mat-toolbar>

		<section>
			<router-outlet/>
		</section>
	`,
	styles: `
		:host {
			display: grid;
			grid-template-rows: 64px auto;
			max-width: 800px;
			margin: auto;
			padding: 2rem;
			nav {
				position: sticky;
				top: 0;
				z-index: 500;
				width: 100%;
				height: 100%;
				display: grid;
				grid-template-columns: auto auto;
				align-content: center;
				justify-content: center;
				border-radius: 9999px;
				button {
					opacity: 0.65;
					border-radius: 0;
					&:hover {
						background: SkyBlue;
						cursor: pointer;
					}
					&.active {
						opacity: 1;
						border-bottom: 2px solid white;
					}
				}
			}
			section {
				margin-top: 1rem;
				background: white;
				padding: 1rem;
			}
		}

		@media only screen and (max-width: 600px) {
			:host {
				padding: 0;
				nav button.cdk-focused {
					background: none;
				}
				section {
					margin-top: 0;
					padding: 1rem 0;
				}
			}
		}
	`,
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
