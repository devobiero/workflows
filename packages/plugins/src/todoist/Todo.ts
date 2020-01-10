import { api, EventSignature, Plugin } from '@workflows/core';

export interface Task {
  id: string;
  name: string;
  completed: boolean;
  priority: number;
}

@Plugin.register
@Plugin.addEventSignature({
  requiredKeys: ['completed', 'priority'],
  name: Todo.name,
} as EventSignature)
export class Todo {
  load(): void {}

  async run(args: any): Promise<Task> {
    console.log('executing event on todo plugin', args);
    try {
      return await api<Task>({
        url: 'https://api.todoist.com/rest/v1/tasks',
        options: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.TODO_API_TOKEN}`,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }

  unload(): void {
    console.log('unload from todo plugin');
  }
}
