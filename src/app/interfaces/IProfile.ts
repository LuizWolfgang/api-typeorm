import { ObjectId } from "typeorm";

interface IProfileInput {
  about: string;
  education: string;
  career: string;
}

interface IProfileOutput {
  id: ObjectId;
  about: string;
  education: string;
  career: string;
}

export { IProfileInput, IProfileOutput };
