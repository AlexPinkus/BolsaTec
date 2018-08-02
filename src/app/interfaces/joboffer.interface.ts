export interface Joboffer {
  uid?:          any;
  idEnterprise?: any;
  createdOn?:    Date;
  applicants:    Array<any>;

  // Datos del puesto
  position:     string;
  description:  string;
  salary?:      number;
  economicaid?: number;
  vacantNumber: number;
  // # de horas a trabajar a la semana
  weeklyHours:     number;
  // location:     string;


  // Perfil deseado
  bachelors:     string[];
  aptitudes:    string[];
  experience:   number;
  languages?: {
    english: {
      written:  string;
      spoken:   string;
      translation: string;
    }
  };
  state?:    string;
}
