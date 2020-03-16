/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DustComponent } from './dust.component';

describe('DustComponent', () => {
  let component: DustComponent;
  let fixture: ComponentFixture<DustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
