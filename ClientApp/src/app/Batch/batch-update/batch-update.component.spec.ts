import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchUpdateComponent } from './batch-update.component';

describe('BatchUpdateComponent', () => {
  let component: BatchUpdateComponent;
  let fixture: ComponentFixture<BatchUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
