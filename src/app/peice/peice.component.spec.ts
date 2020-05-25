import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeiceComponent } from './peice.component';

describe('PeiceComponent', () => {
  let component: PeiceComponent;
  let fixture: ComponentFixture<PeiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
