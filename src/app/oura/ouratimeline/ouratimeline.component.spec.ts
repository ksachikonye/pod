import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuratimelineComponent } from './ouratimeline.component';

describe('OuratimelineComponent', () => {
  let component: OuratimelineComponent;
  let fixture: ComponentFixture<OuratimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuratimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OuratimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
