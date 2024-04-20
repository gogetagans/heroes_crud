/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { UpperCaseInputDirective } from './toUpperCase.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Directive: ToUpperCase', () => {
  it('should create an instance', () => {
    const renderer = {} as Renderer2;
    const elementRef = {} as ElementRef;
    const directive = new UpperCaseInputDirective(renderer, elementRef);
    expect(directive).toBeTruthy();
  });
});
