import { Component } from "@angular/core";
import { Joboffer } from "../../../interfaces/joboffer.interface";
import { Enterprise } from "../../../interfaces/enterprise.interface";
import { JobofferService } from "../../../services/joboffer.service";
import { EnterpriseService } from "../../../services/enterprise.service";
import { StudentService } from "../../../services/student.service";
import { AuthService } from "../../../services/auth.service";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { map, take, tap, finalize } from 'rxjs/operators';

declare var $: any;
@Component({
  selector: "app-joboffer-view",
  templateUrl: "./joboffer-view.component.html",
  styleUrls: ["./joboffer-view.component.scss"]
})
export class JobofferViewComponent {

  // public joboffer: Joboffer;
  public formulario: FormGroup;
  public success: boolean;

  mensaje_modal: string;
  licenciaturas: string[] = [];

  public joboffer$: Observable<Joboffer>;
  public enterprise$: Observable<Enterprise>;
  public students$: Observable<any[]>;
  public user$: Observable<any>;

  public is_Postulated: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private jobofferService: JobofferService,
    private enterpriseService: EnterpriseService,
    private studentService: StudentService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    // Primero se crea el formulario
    this.createform();
    this.activatedRoute.params.subscribe(params => {
      this.joboffer$ = this.jobofferService.getJoboffer(params["id"]).valueChanges().pipe(
        take(1),
        tap(joboffer => {
          // Filtramos para ver si el id fue válido
          if (!!joboffer) {
            this.user$ = this.authService.user.pipe(
              //take(1),
              tap(user => {
                this.is_Postulated = joboffer.applicants.includes(user.uid);
              })
            );
            this.students$ = this.studentService.getStudentsInArray(joboffer.applicants);
            this.licenciaturas = this.getCarreraName(joboffer.bachelors);
            this.enterprise$ = this.enterpriseService.getEnterprise(joboffer.idEnterprise).valueChanges();
          } else {
            // Regresa página 404 not found
            console.log('No existe');
          }
        })
      );
    });
  }

  createform() {
    this.formulario = this.formBuilder.group({
      postulación: ["", Validators.required]
    });
  }

  getCarreraName(array) {
    const result: string[] = [];
    for (let index = 0; index < array.length; index++) {
      switch (array[index]) {
        case "industrial":
          result[index] = "Ingeniería Industrial";
          break;
        case "bioquimica":
          result[index] = "Ingeniería Bioquímica";
          break;
        case "ambiental":
          result[index] = "Ingeniería Ambiental";
          break;
        case "biomedica":
          result[index] = "Ingeniería Biomédica";
          break;
        case "gestion":
          result[index] = "Ingeniería en Gestión Empresarial";
          break;
        case "quimica":
          result[index] = "Ingeniería Química";
          break;
        case "electrica":
          result[index] = "Ingeniería Eléctrica";
          break;
        case "electronica":
          result[index] = "Ingeniería Electrónica";
          break;
        case "mecanica":
          result[index] = "Ingeniería Mecánica";
          break;
        case "civil":
          result[index] = "Ingeniería Civil";
          break;
        case "sistemas":
          result[index] = "Sistemas Computacionales";
          break;
        case "administracion":
          result[index] = "Administración";
          break;
        case "administracion_distancia":
          result[index] = "Administración en Educación a Distancia";
          break;
        default:
          break;
      }
    }
    return result;
  }

  postulate(joboffer: Joboffer, studentId, modalConfirmacion) {
    this.mensaje_modal = "¿Deseas postularte para esta oferta de trabajo?";

    this.modalService.open(modalConfirmacion).result.then(() => {
        // El estudiante se postula.
        // Ya se ha postulado antes (sólo por protección)
        if (joboffer.applicants.includes(studentId)) { return; }
        joboffer.applicants.push(studentId);
        console.log('joboffer :', joboffer);
        this.jobofferService.updateJoboffer(joboffer.uid, joboffer)
        .then((result) => {
          this.success = true;
        }).catch((err) => {
          console.log('err :', err);
          this.success = false;
        });
      },
      reason => {}
    );
  }

  isPostulated(joboffer: Joboffer, studentId): boolean {
    console.log('joboffer.applicants :', joboffer.applicants);
    return joboffer.applicants.includes(studentId);
  }

  downloadCV(value) {
    console.log('value :', value);
  }

}
