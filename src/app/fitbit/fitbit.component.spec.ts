import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitbitComponent } from './fitbit.component';

describe('FitbitComponent', () => {
  let component: FitbitComponent;
  let fixture: ComponentFixture<FitbitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitbitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
