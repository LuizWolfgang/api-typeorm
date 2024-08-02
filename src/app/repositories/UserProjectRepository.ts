import { ValidationErrorItem } from "joi";
import { AppDataSource } from "../../database/dataSource";
import { UserProject } from "../entities/UserProject";
import { IUserProjectOutput, IUserProjectInput } from "../interfaces/IUserProject";
import { ErrorExtension } from "../utils/ErrorExtension";
import userProjectSchemaValidation from "../validations/userProjectSchemaValidation";


export class UserProjectRepository {
  private static userProjectRepository =
    AppDataSource.getRepository(UserProject);

  static async getUsersProjects(): Promise<IUserProjectOutput[]> {
    return this.userProjectRepository.find({
      relations: {
        users: true,
        projects: true,
      },
    });
  }

  static async newUserProject(
    userProject: IUserProjectInput,
  ): Promise<IUserProjectOutput> {
    const { error } = userProjectSchemaValidation.validate(userProject, {
      abortEarly: false,
    });
    if (error) {
      const validateErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message,
      );
      throw new ErrorExtension(400, validateErrors.join(","));
    }

    const createdUserProject =
      await this.userProjectRepository.save(userProject);
    return createdUserProject;
  }

  static async getUserProject(id: number): Promise<IUserProjectOutput | null> {
    const userProject = await this.userProjectRepository.findOneBy({ id });

    if (!userProject) {
      throw new ErrorExtension(404, "UserProject not found!");
    }

    return userProject;
  }

  static async updateUserProject(
    id: number,
    userProject: IUserProjectInput,
  ): Promise<string> {
    const userProjectData = await this.userProjectRepository.findOneBy({ id });

    if (!userProjectData) {
      throw new ErrorExtension(404, "UserProject not found!");
    }

    await this.userProjectRepository.update(id, userProject);

    return "UserProject data was updated!";
  }

  static async removeUserProject(id: number): Promise<string> {
    await this.userProjectRepository.delete(id);

    return "UserProject removed!";
  }
}

export default UserProjectRepository;
