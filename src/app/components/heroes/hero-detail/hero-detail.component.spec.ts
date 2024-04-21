import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import HeroDetailComponent from './hero-detail.component';
import { HeroesService } from '../../../../services';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockHeroService: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: '1' }),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockHeroService = jasmine.createSpyObj('HeroesService', [
      'addHero',
      'getHeroById',
      'updateHero',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,HeroDetailComponent],
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

  it('should initialize the form', () => {
    expect(component.form.get('_id')).toBeTruthy();
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('superpower')).toBeTruthy();
  });

  it('should disable _id control when in edit mode', () => {
    expect(component.form.get('_id')?.disabled).toBeTrue();
  });

  it('should enable _id control when in create mode', () => {
    mockActivatedRoute.params = of({ id: 'new' });
    expect(component.form.get('_id')?.enabled).toBeTrue();
  });

  it('should call getHeroById when in edit mode', () => {
    expect(mockHeroService.getHeroById).toHaveBeenCalledWith('1');
  });

  it('should call saveHero when not in edit mode', () => {
    component.onSave();
    expect(mockHeroService.addHero).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../heroes']);
  });

  it('should call updateHero when in edit mode', () => {
    component.form.patchValue({ _id: '1', name: 'Updated Hero', superpower: 'Superpower' });
    component.onSave();
    expect(mockHeroService.updateHero).toHaveBeenCalledWith({
      _id: '1',
      name: 'Updated Hero',
      superpower: 'Superpower',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../heroes']);
  });

  it('should navigate back to heroes list on cancel', () => {
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../heroes']);
  });

  it('should unsubscribe from route params subscription on component destroy', () => {
    component.ngOnDestroy();
    expect(component['suscription'].unsubscribe).toHaveBeenCalled();
  });
});