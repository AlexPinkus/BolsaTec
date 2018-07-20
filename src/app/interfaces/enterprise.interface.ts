export interface Enterprise {
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
  createdOn?: number;
  isActive?:  boolean;
}
