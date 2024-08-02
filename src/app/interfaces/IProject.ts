interface IProjectInput {
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  active?: boolean;
}

interface IProjectOutput {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  active?: boolean;
}

export { IProjectInput, IProjectOutput };
