import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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
export default class FilterComponent {
  filterSubject$: Subject<string> = new Subject<string>();
  form = new FormGroup({
    filter: new FormControl<string>(''),
  });

  constructor(private heroesService: HeroesService) {
    this.filterSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((search) => {
          this.heroesService.findHeroes(search);
          return search;
        })
      )
      .subscribe();
  }

  onClickSearch() {
    const search = this.form.controls['filter'].getRawValue();
    this.filterSubject$.next(search || '');
  }
}
