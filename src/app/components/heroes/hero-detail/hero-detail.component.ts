import { Component } from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export default class HeroDetailComponent {
  editForm = false;
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
    this.route.params.subscribe((params) => {
      this.editForm = params['id'] !== 'new';

      if (this.editForm) {
        this.getHeroById(params['id']);
      } else {
        this.form.controls['_id'].disable();
      }
    });
  }

  isEditForm(): boolean {
    return this.editForm;
  }

  onSave(): void {
    const hero = this.form.value as Hero;
    this.isEditForm() ? this.updateHero(hero) : this.saveHero(hero);
  }

  onCancel(): void {
    this.router.navigate(['../heroes'])
  }

  saveHero(hero: Hero): void {
    this.heroService.addHero(hero);
    this.router.navigate(['../heroes'])
    }

  getHeroById(id: string): void {
    this.heroService.getHeroById(id).subscribe((hero) => {
      this.form.patchValue(hero);
    });
  }
  updateHero(hero: Hero): void {
    this.heroService.updateHero(hero);
    this.router.navigate(['../heroes'])
  }
}
