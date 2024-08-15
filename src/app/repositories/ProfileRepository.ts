
import { IProfileInput, IProfileOutput } from "../interfaces/IProfile";
import { AppDataSourceMongoDB } from "../../database/dataSource";
import { Profile } from "../entities/Profile";

export class ProfileRepository {
  private static profileRepository =
    AppDataSourceMongoDB.getRepository(Profile);

  static async getProfile(): Promise<IProfileOutput[]> {
    return this.profileRepository.find();
  }

  static async createProfile(profile: IProfileInput): Promise<IProfileOutput> {
    const createdProfile = await this.profileRepository.save(profile);
    return createdProfile;
  }
}

