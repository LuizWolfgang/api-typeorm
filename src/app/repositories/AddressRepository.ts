import { ValidationErrorItem } from "joi";

import { AppDataSource } from "../../database/dataSource";
import addressSchemaValidation from "../validations/addressSchemaValidation";
import { IAddressInput, IAddressOutput } from "../interfaces/IAddress";
import { ErrorExtension } from "../utils/ErrorExtension";
import { Address } from "../entities/Address";


class AddressRepository {
  private static addressRepository = AppDataSource.getRepository(Address);

  static async getAddress(): Promise<IAddressOutput[]> {
    return this.addressRepository.find({ relations: { users: true } });
  }

  static async newAddress(address: IAddressInput): Promise<IAddressOutput> {
    const { error } = addressSchemaValidation.validate(address, {
      abortEarly: false,
    });
    if (error) {
      const validateErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message,
      );
      throw new ErrorExtension(400, validateErrors.join(","));
    }

    const createdAddress = await this.addressRepository.save(address);
    return createdAddress;
  }

  static async removeAddress(id: number): Promise<string> {
    await this.addressRepository.delete(id);
    return "Address removed!";
  }
}

export default AddressRepository;
