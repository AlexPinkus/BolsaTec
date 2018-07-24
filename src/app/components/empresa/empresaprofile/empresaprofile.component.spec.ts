import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaprofileComponent } from './empresaprofile.component';

describe('EmpresaprofileComponent', () => {
  let component: EmpresaprofileComponent;
  let fixture: ComponentFixture<EmpresaprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
