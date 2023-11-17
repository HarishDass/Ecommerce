export interface formikDataLogin {
  username: string;
  password: string;
}
export interface formikDataRegister {
  username: string;
  age: number | any;
  emailId: string;
  password: string;
}
export interface registerToLogin {
  message: Function;
  visible: Function;
}

export interface toast {
  status: string ;
}

export interface Contact{
  username: string;
  mailId: string;
  content: string;
}
export interface productDetails{
  productName: String,
  productImage: String,
  productDescription: String,
}
export interface productPro{
  name: String,
  productDetails: [productDetails],
}

export interface product{
  section: String,
  sectionImage: String,
  products: [productPro],
}
