import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { WindowRef } from './window-ref.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api/users';
  private token: string | null = null;
  private user = new BehaviorSubject<any>(null);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient, private windowRef: WindowRef) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.getCurrentUser().subscribe();
      })
    );
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.getCurrentUser().subscribe();
      })
    );
  }

  getToken(): string | null {
    if (!this.token && this.windowRef.nativeWindow) {
      this.token = this.windowRef.nativeWindow.localStorage.getItem('token');
    }
    return this.token;
  }

  private setToken(token: string) {
    this.token = token;
    if (this.windowRef.nativeWindow) {
      this.windowRef.nativeWindow.localStorage.setItem('token', token);
    }
  }

  logout() {
    this.token = null;
    this.user.next(null);
    if (this.windowRef.nativeWindow) {
      this.windowRef.nativeWindow.localStorage.removeItem('token');
    }
  }

  getCurrentUser(): Observable<any> {
    if (this.user.value) {
      return this.user$;
    }
    const headers = new HttpHeaders().set('x-auth-token', this.getToken() || '');
    return this.http.get(`${this.apiUrl}/me`, { headers }).pipe(
      tap(user => this.user.next(user))
    );
  }
}

