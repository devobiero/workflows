import { api, IEventSignature, IPlugin, Logger } from '@workflows/core';

export interface ITask {
  id: string;
  name: string;
  completed: boolean;
  priority: number;
  projectId: number;
  created: string;
  url: string;
  due?: {
    recurring: string;
    date: string
  }
}

@IPlugin.register
@IPlugin.addEventSignature({
  requiredKeys: ['completed', 'priority'],
  name: Todo.name,
} as IEventSignature)
export class Todo {
  load(): void {
    Logger.info('load from todo plugin');
  }

  async run(args: any): Promise<ITask> {
    Logger.info('executing event on todo plugin', args);
    try {
      return await api<ITask>({
        url: 'https://api.todoist.com/rest/v1/tasks',
        options: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.TODO_API_TOKEN}`,
          },
        },
      });
    } catch (error) {
      Logger.error(error);
      throw Error(error);
    }
  }

  unload(): void {
    Logger.info('unload from todo plugin');
  }
}
