import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login_auth.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.user).subscribe({
      next: (res) => {
        // Redirect to dashboard on successful login
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMsg = err.error.msg || 'Login failed. Please try again.';
        console.error(err);
      }
    });
  }
}
