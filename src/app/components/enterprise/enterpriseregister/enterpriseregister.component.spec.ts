import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseregisterComponent } from './enterpriseregister.component';

describe('EnterpriseregisterComponent', () => {
  let component: EnterpriseregisterComponent;
  let fixture: ComponentFixture<EnterpriseregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
