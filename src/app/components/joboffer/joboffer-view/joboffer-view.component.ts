import { Component } from "@angular/core";
import { Joboffer } from "../../../interfaces/joboffer.interface";
import { JobofferService } from "../../../services/joboffer.service";
import { AuthService } from "../../../services/auth.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "../../../services/student.service";
import { Observable } from "rxjs";
import { EnterpriseService } from "../../../services/enterprise.service";
import { Enterprise } from "../../../interfaces/interfaces";
declare var $: any;
@Component({
  selector: "app-joboffer-view",
  templateUrl: "./joboffer-view.component.html",
  styleUrls: ["./joboffer-view.component.scss"]
})
export class JobofferViewComponent {

  public joboffer: Joboffer;
  public formulario: FormGroup;
  public loaded = false;
  public successoffer = false;
  mensaje_modal: string;
  licenciaturas: string[] = [];
  role: string;
  students: any;
  joboffer2: Observable<any>;
  enterprise: Enterprise;
  constructor(
    private jobofferService: JobofferService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private rutaURL: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private studentService: StudentService,
    private enterpriseService: EnterpriseService
  ) {
    // Primero se crea el formulario
    this.createform();
    // Se obtiene el valor del UID de la oferta y se obtiene la oferta
    // ..
    // ..
    // Se busca la licenciatura teniendo el objeto de la oferta
    //  this.licenciaturas = this.getCarreraName(this.joboffer.bachelors);
    // // Se obtienen los estudiantes postulados a la oferta si el usuario es empresa
    //   if (this.authService.userDoc.role == 'enterprise') {
    //     this.role = 'enterprise';
    //   }
    let id_oferta: string;
    this.activatedRoute.params.subscribe(params => {
      id_oferta = params["id"];
    });

    console.log(id_oferta);
    // this.jobofferService.getJoboffer(id_oferta).valueChanges().subscribe(
    //   data => {
    //     this.joboffer = data;
    //     this.licenciaturas = this.getCarreraName(data.bachelors);
    //     this.loaded = true;
    //     console.log(this.joboffer);
    //   });

    this.jobofferService.getJobofferData(id_oferta).then((data: Joboffer) => {
      this.joboffer = data;
      this.licenciaturas = this.getCarreraName(data.bachelors);
      const id_enterprise = this.joboffer.idEnterprise;
      this.enterpriseService
        .getEnterpriseData(id_enterprise)
        .then((res: Enterprise) => {
          this.enterprise = res;
          this.loaded = true;
        });
    });
    // this.joboffer = this.jobofferService.getJoboffer(id_oferta).valueChanges();

    // this.joboffer.subscribe(  data => {
    //       this.licenciaturas = this.getCarreraName(data.bachelors);
    //     });
  }

  // ----------------------------------------------------------------------------------------------------------------
  // Programador: Félix Ehuan
  // Fecha: 18/07/2018
  // Función createform: Crea el formulario para la postulación
  // ----------------------------------------------------------------------------------------------------------------
  createform() {
    this.formulario = this.formBuilder.group({
      postulación: ["", Validators.required]
    });
  }
  // ----------------------------------------------------------------------------------------------------------------
  // Programador: Félix Ehuan
  // Fecha: 18/07/2018
  // Función getCarreraName: Obtiene el nombre de la carrera dado el key
  // del arreglo bachelors en la oferta de trabajo, puede ser invocado cuando se obtiene el objeto del firebase
  // ----------------------------------------------------------------------------------------------------------------

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

  postularse(modalConfirmacion) {
    this.mensaje_modal = "¿Deseas postularte para esta oferta de trabajo?";

    this.modalService.open(modalConfirmacion).result.then(
      () => {
        //  const notificacion = this.modalService.open(modalNotificacion);
        // $.bigBox({
        //   title: "Solicitud enviada",
        //   content: "¡Tu postulación ha sido enviada exitosamente!",
        //   fa: "fa-save fa-lg",
        //   tabicon: false,
        //   sound: false,
        //   color: "#82ce34",
        //   timeout: 4000,
        //   delay: 0.5
        // });
        this.successoffer = true;
      },
      reason => {}
    );
  }
}
