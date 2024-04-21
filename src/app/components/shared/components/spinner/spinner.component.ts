import { Component } from '@angular/core';
import { LoaderService } from '../../../../../services/loader/loader.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports:[NgIf]
})
export default class SpinnerComponent{
  isLoading= false;
  constructor(private loaderService: LoaderService) { 
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

}
