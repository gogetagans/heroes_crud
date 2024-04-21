/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import  FilterComponent  from './filter.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FilterComponent],
      providers: [HttpClient, HttpHandler],
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
