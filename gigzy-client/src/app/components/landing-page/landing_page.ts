import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing_page.html',
  styleUrls: ['./landing_page_style.css']
})
export class LandingPageComponent {
  // You can add component logic here later
}
