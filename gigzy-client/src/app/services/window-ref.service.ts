import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

function getWindow(): any {
  return typeof window !== 'undefined' ? window : null;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRef {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return getWindow();
    }
    return null;
  }
}
