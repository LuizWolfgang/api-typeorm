import { ValidationErrorItem } from "joi";
import { AppDataSource } from "../../database/dataSource";
import { Project } from "../entities/Project";
import { IProjectOutput, IProjectInput } from "../interfaces/IProject";
import { ErrorExtension } from "../utils/ErrorExtension";
import projectSchemaValidation from "../validations/projectSchemaValidation";


export class ProjectRepository {
  private static projectRepository = AppDataSource.getRepository(Project);

  static async getProjects(): Promise<IProjectOutput[]> {
    return this.projectRepository.find({
      relations: {
        UserProject: true
      }
    });
  }

  static async newProject(project: IProjectInput): Promise<IProjectOutput> {
    const { error } = projectSchemaValidation.validate(project, {
      abortEarly: false,
    });
    if (error) {
      const validateErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message,
      );
      throw new ErrorExtension(400, validateErrors.join(","));
    }

    const createdProject = await this.projectRepository.save(project);
    return createdProject;
  }

  static async getProject(id: number): Promise<IProjectOutput | null> {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new ErrorExtension(404, "Project not found!");
    }

    return project;
  }

  static async removeProject(id: number): Promise<string> {
    await this.projectRepository.delete(id);

    return "Project removed!";
  }
}

