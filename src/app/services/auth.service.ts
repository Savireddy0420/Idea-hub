import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key = 'user';

  login(user: any) {
    localStorage.setItem(this.key, JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.key) || '{}');
  }

  isLoggedIn(): boolean {
    return !!this.getUser().name;
  }

  isAdmin(): boolean {
    return this.getUser().role === 'admin';
  }

  logout() {
    localStorage.removeItem(this.key);
  }
}