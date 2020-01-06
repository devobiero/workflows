import { api, EventManager as _, Plugin } from "@workflows/core";
import { Service } from "../Types";

export interface Task {
  id: string;
  name: string;
}

export class Todo implements Plugin<Task> {
  load(): void {
    console.log("load from todo plugin");
    _.subscribe(Service.Calendar, () => {
      console.log("Todo function from event");
    });
  }

  // 2fbb8adfa421cba2f7c53649e37f02f32a86caa1
  run(args: any): void {
    const token = "2fbb8adfa421cba2f7c53649e37f02f32a86caa1";
    api<Task>({
      url: "https://api.todoist.com/rest/v1/projects",
      options: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    })
      .then(task => {
        console.log("executing event on todo plugin", args);
        console.log(task);
        _.publish(Service.TODO);
      })
      .catch(error => console.error(error));
  }

  unload(): void {
    console.log("unload from todo plugin");
  }
}
