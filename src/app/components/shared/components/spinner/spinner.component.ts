import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from '../../../../../services/loader/loader.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports:[NgIf]
})
export default class SpinnerComponent implements OnDestroy{
  private subscription = new Subscription();
  isLoading= false;
  constructor(private loaderService: LoaderService) { 
    this.subscription.add(this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
