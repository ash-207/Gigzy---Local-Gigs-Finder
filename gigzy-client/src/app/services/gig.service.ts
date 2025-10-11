import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GigService {
  private apiUrl = 'http://localhost:5001/api/gigs';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getGigs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  postGig(gigData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    return this.http.post(this.apiUrl, gigData, { headers });
  }
}

