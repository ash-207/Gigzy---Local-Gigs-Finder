import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GigService } from '../../services/gig.service';

@Component({
  selector: 'app-post-gig',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './post_gig.html',
  styleUrls: ['./post_gig.css'],
})
export class PostGigComponent {
  successMsg = '';
  errorMsg = '';
  gig = {
    title: '',
    description: '',
    location: '',
    applyLink: '',
  };

  constructor(private gigService: GigService) {}

  onSubmit() {
    this.gigService.postGig(this.gig).subscribe({
      next: (res) => {
        this.successMsg = 'Gig posted successfully!';
        this.errorMsg = '';
        this.gig = { title: '', description: '', location: '', applyLink: '' }; // Reset form
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err) => {
        this.errorMsg = 'Failed to post gig. Please try again.';
        this.successMsg = '';
        console.error(err);
      }
    });
  }
}
