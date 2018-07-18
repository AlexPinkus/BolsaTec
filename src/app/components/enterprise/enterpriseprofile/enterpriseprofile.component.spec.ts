import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseprofileComponent } from './enterpriseprofile.component';

describe('EnterpriseprofileComponent', () => {
  let component: EnterpriseprofileComponent;
  let fixture: ComponentFixture<EnterpriseprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
