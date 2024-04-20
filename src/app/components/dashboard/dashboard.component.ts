import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatButtonModule]
})
export default class DashboardComponent{

}
