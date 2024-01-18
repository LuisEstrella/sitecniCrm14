export interface IApiResult<T> {
    succeeded: boolean;
    message: string;
    messages: string[];
    data: T;
  }