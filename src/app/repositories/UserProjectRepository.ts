import { ValidationErrorItem } from "joi";
import { AppDataSource } from "../../database/dataSource";
import { UserProject } from "../entities/UserProject";
import { IUserProjectOutput, IUserProjectInput } from "../interfaces/IUserProject";
import { ErrorExtension } from "../utils/ErrorExtension";
import userProjectSchemaValidation from "../validations/userProjectSchemaValidation";
import { IProjectInput, IProjectOutput } from "../interfaces/IProject";
import { IUserInput, IUserOutput } from "../interfaces/IUser";
import { User } from "../entities/User";
import { Project } from "../entities/Project";


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

  // exemplo de transactions
  static async createAll(data: {
    user: IUserInput;
    project: IProjectInput;
    user_project: IUserProjectInput;
  }): Promise<{
    user: IUserOutput;
    project: IProjectOutput;
    user_project: IUserProjectOutput;
  }> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.save(User, data.user);
      const project = await queryRunner.manager.save(Project, data.project);

      //insere dados de varias entidades diferentes. 
      const user_project = await queryRunner.manager.save(UserProject, {
        hours_worked: data.user_project.hours_worked,
        id_project: project.id,
        id_user: user.id,
      });

      //criamos o usuario, projeto, e as horas trabalhdas de uma vez.
      await queryRunner.commitTransaction();

      return { user, project, user_project };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}


export default UserProjectRepository;
