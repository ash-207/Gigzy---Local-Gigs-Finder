import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GigService {
  private apiUrl = 'http://localhost:5001/api/gigs'; // Assuming the server runs on port 5001

  constructor(private http: HttpClient) { }

  getGigs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  postGig(gigData: any): Observable<any> {
    return this.http.post(this.apiUrl, gigData);
  }
}
