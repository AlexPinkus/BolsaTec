import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Student } from '../../../interfaces/student.interface';



@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  public valid_form: boolean;
  public formulario: FormGroup;
  public student: Student;
  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      email_confirm: ['', Validators.compose([Validators.required, this.match('email')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,18}/), this.match('password_confirm')])],
      password_confirm: ['', Validators.compose([Validators.required, this.match('password')])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      sex: ['', Validators.required],
      age: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      mainStreet: ['', Validators.required],
      crossings: ['', Validators.required],
      postalCode: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      city: ['', Validators.required],
      municipality: ['', Validators.required],
      state: ['', Validators.required],
      idStudent: ['', Validators.compose([Validators.required, Validators.pattern(/^E{1}[0-9]{7}/)])],
      bachelor: ['', Validators.required],
      speciality: ['', Validators.required],
      master: ['', Validators.required],
      phd: ['', Validators.required],
      spoken: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
      written: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
      translation: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],

    });
  }

  ngOnInit() {
  }

  match(controlKey: string) {
    return (control: FormControl): { [s: string]: boolean } => {
        // control.parent es el FormGroup
        if (control.parent) { // en las primeras llamadas control.parent es undefined
          const checkValue  = control.parent.controls[controlKey].value;
          if (control.value !== checkValue) {
            return {
              match: false
            };
          }
        }
        return null;
    };
  }

  agregar() {
        console.log(this.formulario);
  }
}
