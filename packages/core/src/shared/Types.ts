export enum Events {
  Calendar = 'Calendar',
  Aol = 'Aol',
}

export interface Request {
  type: string;
  body?: {
    event?: string;
  };
}
