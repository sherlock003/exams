export type Address = {
  home: string;
  street: string;
  suburb: string;
  state: string;
  postCode: string;
  country: string;
};

export interface Referral extends Address {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
