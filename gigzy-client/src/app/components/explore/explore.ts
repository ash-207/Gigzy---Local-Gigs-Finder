import { Component, OnInit, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GigService } from '../../services/gig.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './explore_2.html',
  styleUrls: ['./explore_2_style.css']
})
export class ExploreComponent implements OnInit, AfterViewInit {
  gigs: any[] = [];
  private map: any;

  constructor(
    private gigService: GigService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.gigService.getGigs().subscribe(data => {
      this.gigs = data;
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(L => {
        this.initMap(L);
      });
    }
  }

  private initMap(L: any): void {
    this.map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
