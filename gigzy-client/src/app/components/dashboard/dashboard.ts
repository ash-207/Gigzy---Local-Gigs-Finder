import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./db_style.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['/login']);
      }
    });

    this.authService.getCurrentUser().subscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
