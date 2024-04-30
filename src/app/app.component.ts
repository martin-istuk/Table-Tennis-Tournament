import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  template: "<router-outlet/>",
  styles: "",
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  title = "table-tennis-tournament";
}
