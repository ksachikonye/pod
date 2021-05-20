import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossfilterComponent } from './crossfilter.component';

describe('CrossfilterComponent', () => {
  let component: CrossfilterComponent;
  let fixture: ComponentFixture<CrossfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossfilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
