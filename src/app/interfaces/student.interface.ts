// export interface Student {
//   uid?:      any;
//   firstName: string;
//   lastName:  string;
//   email:     string;
//   phone:     number;
//   address: {
//     mainStreet: string;
//     crossings:  string;
//     postalCode: number;
//     state:      string;
//   };
//   // languages: {
//   //   english: {
//   //     written:  string;
//   //     spoken:   string;
//   //   }
//   // };
//   // createdOn: Date;
//   // isActive:  boolean;
// }
export interface Student {
  uid?:      any;
  // Matrícula
  idStudent?: any;
  firstName: string;
  lastName:  string;
  middleName?: string;
  age?: Date;
  sex?: string;
  email:     string;
  phone:     number;
  address: {
    mainStreet: string;
    crossings:  string;
    postalCode: number;
    state:      string;
    neighborhood?: string;
    municipality?: string;
    city?: string;
  };
  languages?: {
    english: {
      written:  string;
      spoken:   string;
      translation: string;
    }
  };
  degree?: {
    bachelor: string;
    speciality: string;
    master: string;
    phd: string;
  };
  experience?: string;
  resumeURL?:  string;
  speciality?: string;
  maritalStatus?: string;
  createdOn?: Date;
  isGraduated?: boolean;
  isActive?:  boolean;
  role?: string;
}
