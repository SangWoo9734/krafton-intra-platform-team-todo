export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  importantLabel: ImportantLabelVarients | null;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date | null;
}

export type ImportantLabelVarients = 'high' | 'medium' | 'low';
export type ImportantLabelColors = 'red' | 'gray' | 'blue';

export type TodoInput = Pick<Todo, 'title'> & {
  importantLabel?: ImportantLabelVarients | null;
  deadline?: Date | null;
};

export type TodoUpdate = Partial<
  Pick<Todo, 'title' | 'completed' | 'importantLabel' | 'deadline'>
>;
