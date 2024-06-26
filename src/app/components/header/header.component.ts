import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import SpinnerComponent from '../shared/components/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatButtonModule, SpinnerComponent]
})
export default class HeaderComponent {

  constructor(private router: Router) { }

  onClickList() {
    this.router.navigate(['../heroes']);
  }
  onClickNew() {
    this.router.navigate(['../heroes/new']);
  }
  onClickHome() {
    this.router.navigate(['../dashboard']);
  }

}
