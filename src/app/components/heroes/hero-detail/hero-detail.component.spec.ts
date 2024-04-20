
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Hero } from '../../../../models/hero';
import HeroDetailComponent from './hero-detail.component';
import { HeroesService } from '../../../../services/heroService/heroes.service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockHeroService: any;

  beforeEach(() => {
    mockActivatedRoute = {
      params: of({ id: '1' }),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockHeroService = jasmine.createSpyObj('HeroesService', ['addHero', 'getHeroById', 'updateHero']);

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: HeroesService, useValue: mockHeroService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set editForm to true when route param is not "new"', () => {
    mockActivatedRoute.params = of({ id: '1' });
    expect(component.isEditForm()).toBeTrue();
  });

  it('should set editForm to false when route param is "new"', () => {
    mockActivatedRoute.params = of({ id: 'new' });
    expect(component.isEditForm()).toBeFalse();
  });

  it('should disable _id control when editForm is true', () => {
    mockActivatedRoute.params = of({ id: '1' });
    expect(component.form.controls['_id'].disabled).toBeFalse();
  });

  it('should not disable _id control when editForm is false', () => {
    mockActivatedRoute.params = of({ id: 'new' });
    expect(component.form.controls['_id'].disabled).toBeTrue();
  });

  it('should save a new hero', () => {
    const hero: Hero = { _id: '1', name: 'Superman', superpower: 'Flight' };
    component.form.setValue(hero);
    component.saveHero(hero);
    expect(mockHeroService.addHero).toHaveBeenCalledWith(hero);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../heroes']);
  });

  it('should update an existing hero', () => {
    const hero: Hero = { _id: '1', name: 'Superman', superpower: 'Flight' };
    component.form.setValue(hero);
    component.updateHero(hero);
    expect(mockHeroService.updateHero).toHaveBeenCalledWith(hero);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../heroes']);
  });

  it('should navigate back to heroes list on cancel', () => {
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../heroes']);
  });

  it('should retrieve a hero by ID and populate the form', () => {
    const hero: Hero = { _id: '1', name: 'Superman', superpower: 'Flight' };
    mockHeroService.getHeroById.and.returnValue(of(hero));
    component.getHeroById('1');
    expect(mockHeroService.getHeroById).toHaveBeenCalledWith('1');
    expect(component.form.value).toEqual(hero);
  });

  it('should unsubscribe from the route params subscription on destroy', () => {
    component.ngOnDestroy();
    expect(component['suscription'].unsubscribe).toHaveBeenCalled();
  });
});