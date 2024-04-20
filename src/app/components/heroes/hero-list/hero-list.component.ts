import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from '../../../../services/heroService/heroes.service';
import { Observable, Subscription } from 'rxjs';
import { Hero } from '../../../../models/hero';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CapitalLetterPipe } from '../../../pipes/capital-letter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import FilterComponent from '../../filter/filter.component';
import ModalService from '../../../../services/modalService/modalService.service';


@Component({
  standalone: true,
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    CapitalLetterPipe,
    MatButtonModule,
    FilterComponent,
    MatListModule,
    MatDividerModule,
  ],
})
export default class HeroListComponent implements OnDestroy{
  subscription = new Subscription();
  heroes$: Observable<Hero[]>;
  selectedHero!: Hero;
  
constructor(private router: Router, private heroService: HeroesService, private modalService: ModalService) {
    this.heroService.getHeroes();
    this.heroes$ = this.heroService.heroes$;
  }
  
  onClickHero(hero: Hero) {
    this.router.navigate(['../heroes', hero._id]);
  }
  
  onClickDeleteHero(hero: Hero) {
    this.modalService.openDialog();
    this.subscription.add(this.modalService.confirmAction$.subscribe(() => this.heroService.deleteHero(hero._id)));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
