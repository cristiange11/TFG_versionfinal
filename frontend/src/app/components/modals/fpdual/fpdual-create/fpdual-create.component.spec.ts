import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpdualCreateComponent } from './fpdual-create.component';

describe('FpdualCreateComponent', () => {
  let component: FpdualCreateComponent;
  let fixture: ComponentFixture<FpdualCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpdualCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpdualCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
