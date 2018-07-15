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
  }

  export interface Empresa {
    uid?:      any;
    email:     string;
    // Datos contacto
    firstName: string;
    lastName:  string;
    middleName?: string;
    job?: string;
    department?: string;
    phone_contact:    number;
    address_contact?: string;
    // Datos empresa
    comercialName: string;
    bussinessName: string;
    bussinessPhone: string;
    bussinessTurn: string;
    description: string;
    RFC: string;
    logo: string;
    webURL?: string;
    address: {
      mainStreet: string;
      crossings:  string;
      postalCode: number;
      state:      string;
      municipality?: string;
      city?: string;
    };
    createdOn?: Date;
    isActive?:  boolean;
  }
