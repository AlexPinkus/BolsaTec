
export interface Student {
  uid?:      any;
  // Matrícula
  idStudent?: any;
  firstName:  string;
  middleName: string;
  lastName:   string;
  age:        Date;
  sex:        string;
  email:      string;
  phone:      number;

  address: {
    mainStreet:    string;
    crossings:     string;
    postalCode:    number;
    state:         string;
    neighborhood?: string;
    municipality?: string;
    city?:         string;
  };
  languages?: {
    english: {
      written:     string;
      spoken:      string;
      translation: string;
    }
  };
  degree?: {
    bachelor:   string;
    speciality: string;
    master:     string;
    phd:        string;
  };
  experience?:    string;
  resumeURL?:     string;
  speciality?:    string;
  maritalStatus?: string;
  isGraduated?: boolean;
  createdOn?: number;
  isActive?:  boolean;
  role?:      string;
}
