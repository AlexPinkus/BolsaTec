export interface Enterprise {
  uid?:      any;
  email:     string;
  // Datos contacto
  firstName:    string;
  lastName:     string;
  middleName:   string;
  job:          string;
  department:   string;
  contactPhone:   number;
  contactAddress: string;
  // Datos empresa
  comercialName:  string;
  bussinessName:  string;
  bussinessPhone: string;
  bussinessTurn:  string;
  description:    string;
  RFC:            string;
  logo:           string;
  webURL?:        string;
  address: {
    mainStreet:     string;
    crossings:      string;
    postalCode:     number;
    city?:          string;
    municipality?:  string;
    state:          string;
  };
  createdOn?: number;
  isActive?:  boolean;
  role?:      string;
}
