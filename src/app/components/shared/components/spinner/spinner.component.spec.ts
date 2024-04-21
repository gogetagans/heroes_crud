
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgIf } from '@angular/common';
import  SpinnerComponent  from './spinner.component';
import { LoaderService } from '../../../../../services/loader/loader.service';


describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let loaderService: LoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgIf,SpinnerComponent],
      providers: [LoaderService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});