export interface Student {
  id?:       number;
  firstName: string;
  lastName: string;
  email:    string;
  phone:    number;
  address: {
    mainStreet: string;
    crossings:  string;
    postalCode: number;
    state:      string;

  };
  // languages: {
  //   english: {
  //     written:  string;
  //     spoken:   string;
  //   }
  // };
  // createdOn: Date;
  // isActive:  boolean;
}
