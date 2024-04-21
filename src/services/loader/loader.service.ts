import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  /**
   * Observable that emits the current loading state.
   */
  get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  /**
   * Shows the loader.
   */
  showLoader(): void {
    this.loadingSubject.next(true);
  }

  /**
   * Hides the loader.
   */
  hideLoader(): void {
    this.loadingSubject.next(false);
  }
}
