import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassingComponent } from './reassing.component';

describe('ReassingComponent', () => {
  let component: ReassingComponent;
  let fixture: ComponentFixture<ReassingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReassingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReassingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
