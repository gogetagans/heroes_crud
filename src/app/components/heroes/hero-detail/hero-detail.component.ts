import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../../../models/hero';
import { HeroesService } from '../../../../services';
import { Subscription } from 'rxjs';
import { UpperCaseInputDirective } from '../../../directives/toUpperCase.directive';

@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    UpperCaseInputDirective,
  ],
})
export default class HeroDetailComponent implements OnDestroy {

  private suscription = new Subscription();
  private editForm = false;
  form = new FormGroup({
    _id: new FormControl<string>(''),
    name: new FormControl<string>('', Validators.required),
    superpower: new FormControl<string>(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroesService
  ) {
    this.suscription.add(
      this.route.params.subscribe((params) => {
        this.editForm = params['id'] !== 'new';
        this.editForm
          ? this.getHeroById(params['id'])
          : this.form.controls['_id'].disable();
      })
    );
  }

  /**
   * Checks if the form is in edit mode.
   * @returns True if the form is in edit mode, false otherwise.
   */
  isEditForm(): boolean {
    return this.editForm;
  }

  /**
   * Saves the hero data.
   */
  onSave(): void {
    const hero = this.form.value as Hero;
    this.isEditForm() ? this.updateHero(hero) : this.saveHero(hero);
    this.router.navigate(['../heroes']);
  }

  /**
   * Cancels the form and navigates back to the heroes list.
   */
  onCancel(): void {
    this.router.navigate(['../heroes']);
  }

  /**
   * Saves a new hero.
   * @param hero The hero to be saved.
   */
  saveHero(hero: Hero): void {
    this.heroService.addHero(hero);
  }

  /**
   * Retrieves a hero by its ID and populates the form with its data.
   * @param id The ID of the hero to retrieve.
   */
  getHeroById(id: string): void {
    this.heroService
      .getHeroById(id)
      .subscribe((hero) => this.form.patchValue(hero));
  }

  /**
   * Updates an existing hero.
   * @param hero The updated hero data.
   */
  updateHero(hero: Hero): void {
    this.heroService.updateHero(hero);
  }

  /**
   * Unsubscribes from the route params subscription.
   */
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
