import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuraComponent } from './oura.component';

describe('OuraComponent', () => {
  let component: OuraComponent;
  let fixture: ComponentFixture<OuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
