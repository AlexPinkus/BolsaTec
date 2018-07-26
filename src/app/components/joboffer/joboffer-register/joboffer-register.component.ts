import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Joboffer } from '../../../interfaces/joboffer.interface';
import { JobofferService } from '../../../services/joboffer.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joboffer-register',
  templateUrl: './joboffer-register.component.html',
  styleUrls: ['./joboffer-register.component.scss']
})
export class JobofferRegisterComponent implements OnInit {
  public valid_form: boolean;
  public formulario: FormGroup;
  public joboffer: Joboffer = {
    // Datos del puesto
    position:     'Asistente de ventas',
    description:  'Aquí tienen que poner todo',
    salary:       10000,
    vacantNumber: 4,
    weeklyHours:  48,

    applicants: ['vtV4JEZRanhUVaLAbAIibSQZSSI3'],

    // Perfil deseado
    aptitudes:    'Limpieza, orden, puntualidad, trabajo duro',
    experience:   1,
    bachelor: 'Ingenería Industrial',
    languages: {
      english: {
        written:  '80',
        spoken:   '70',
        translation: '80'
      }
    }
  };
  read_flag: boolean;

  // @Input() ruta: string;

  constructor( private jobofferService: JobofferService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private rutaURL: Router,
    private activatedRoute: ActivatedRoute) {
    this.formulario = this.formBuilder.group({

      // Datos del puesto:
      position:     ['', Validators.required],
      description:  ['', Validators.required],
      salary:       ['', Validators.required],
      economicaid:  ['', Validators.required],
      vacantNumber: ['', Validators.required],
      weeklyHours:  ['', Validators.required],
      // Perfil deseado:
      aptitudes:    ['', Validators.required],
      experience:   ['', Validators.required],
      bachelor:   ['', Validators.required],
      written:   ['', Validators.required],
      spoken:   ['', Validators.required],
      translation:   ['', Validators.required]
    });
  }

  ngOnInit() {
    // console.log(this.rutaURL.url);
    // console.log();
    // if (this.rutaURL.url === '/register/employeer') {
    //  this.read_flag = false;
    // } else {
    //   this.read_flag = true;
    // }
    this.read_flag = false;
  }

  register(userId) {
    // Esta es la primera forma en la que se puede hacer...
    // es más rápida y elegante pero podría ser propensa a errores

    // Borramos los valores que no sirven de nada ...
    // delete this.formulario.value.email;
    // this.student = this.formulario.value as Enterprise;

    // Está es la segunda y es a prueba de fallas:

    // for (const key in this.student) {
    //   if (this.student.hasOwnProperty(key)) {
    //       this.student[key] = this.formulario.value[key];
    //   }
    // }
    // this.student.createdOn = Date.now();
    // this.student.isActive = false;
    console.log( this.joboffer );
    // insertando
    this.joboffer.idEnterprise = userId;
    this.joboffer.state = 'active';
    this.jobofferService.createJoboffer(this.joboffer).then(result => {
      console.log('result :', result);
      console.log('Creado');
    });
  }

  cancel( ) {
    // this.router.navigate(['/index']);
    console.log('cancelar');
    this.formulario.reset();
  }

}
