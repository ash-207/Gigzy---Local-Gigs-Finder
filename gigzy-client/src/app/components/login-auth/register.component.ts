import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }
    const { name, email, password } = this.user;
    this.authService.register({ name, email, password }).subscribe({
      next: (res) => {
        // Redirect to login on successful registration
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMsg = err.error.msg || 'Registration failed. Please try again.';
        console.error(err);
      }
    });
  }
}
