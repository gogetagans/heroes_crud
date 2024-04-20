import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Subject,
  Subscription,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { HeroesService } from '../../../services';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export default class FilterComponent implements OnDestroy {
  private subscription = new Subscription();
  filterSubject$: Subject<string> = new Subject<string>();
  form = new FormGroup({
    filter: new FormControl<string>(''),
  });

  constructor(private heroesService: HeroesService) {
    this.subscription.add(
      this.filterSubject$
        .pipe(
          distinctUntilChanged(),
          switchMap((search) => {
            this.heroesService.findHeroes(search);
            return search;
          })
        )
        .subscribe()
    );
  }

  onClickSearch() {
    const search = this.form.controls['filter'].getRawValue();
    this.filterSubject$.next(search || '');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
