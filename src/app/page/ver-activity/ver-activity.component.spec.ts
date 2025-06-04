import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerActivityComponent } from './ver-activity.component';

describe('VerActivityComponent', () => {
  let component: VerActivityComponent;
  let fixture: ComponentFixture<VerActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
