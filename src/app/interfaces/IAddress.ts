interface IAddressInput {
  street: string;
  city: string;
  state: string;
  id_user: number;
}

interface IAddressOutput {
  id: number;
  street: string;
  city: string;
  state: string;
  id_user: number;
}

export { IAddressInput, IAddressOutput };
