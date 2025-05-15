import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test03Component } from './test03.component';

describe('Test03Component', () => {
  let component: Test03Component;
  let fixture: ComponentFixture<Test03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Test03Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Test03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
