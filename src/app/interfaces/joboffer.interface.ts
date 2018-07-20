export interface Joboffer {
  uid?:         any;
  idEnterprise: any;
  createdOn?:   Date;
  position:     string;
  salary:       number;
  description:  string;
  vacantsNumber: number;
  languages?: {
    english: {
      written:  string;
      spoken:   string;
      translation: string;
    }
  };
  schedule: number;
  state:    string;
}
