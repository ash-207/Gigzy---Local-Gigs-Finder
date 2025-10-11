import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about_page.html',
  styleUrls: ['./about_style.css']
})
export class AboutComponent {
  // You can add component logic here later
}
