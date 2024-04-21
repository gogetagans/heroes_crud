import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  showLoader(): void {
    this.loadingSubject.next(true);
  }

  hideLoader(): void {
    this.loadingSubject.next(false);
  }
}
