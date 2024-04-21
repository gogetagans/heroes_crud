/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import HeroListComponent from './hero-list.component';
import { HeroesService } from '../../../../services';
import ModalService from '../../../../services/modalService/modalService.service';
import { Hero } from '../../../../models/hero';


describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockModalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getHeroes', 'deleteHero']);
    mockModalService = jasmine.createSpyObj('ModalService', ['openDialog']);
    
    await TestBed.configureTestingModule({
      imports: [HeroListComponent],
      declarations: [],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: ModalService, useValue: mockModalService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroes method on heroService', () => {
    expect(mockHeroesService.getHeroes).toHaveBeenCalled();
  });


  it('should open dialog and delete hero on click', () => {
    const mockHero: Hero = { _id: '1', name: 'Hero 1' };
    component.onClickDeleteHero(mockHero);
    expect(mockModalService.openDialog).toHaveBeenCalled();
    expect(mockHeroesService.deleteHero).toHaveBeenCalledWith(mockHero._id);
  });

});