import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaregisterComponent } from './empresaregister.component';

describe('EmpresaregisterComponent', () => {
  let component: EmpresaregisterComponent;
  let fixture: ComponentFixture<EmpresaregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
