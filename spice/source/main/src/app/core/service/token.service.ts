import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  handle(token: string): void {
    if (this.isValid(token)) {
      this.set(token);
    }
  }
  isValid(token: string | null): boolean {
    if (!token){
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        return false;
      }

      const payloadBase64 = tokenParts[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      // Verify expiration
      if (payload.exp && payload.exp < currentTime) {
        return false;
      }

      return true;
    } catch (error) {
      return false; // Token decoding or validation failed
    }
  }

  set(token: string): void {
    localStorage.setItem('token', token);
  }

  get(): string | null {
    return localStorage.getItem('token');
  }

  remove(): void {
    localStorage.removeItem('token');
  }
}
