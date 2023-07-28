import * as constant from "../constant";
import { BaseAction } from "./action";

export interface Payload {
  multipart?: boolean;
  headers?: constant.objects;
  body?: constant.objects;
}

export interface Response {
  statusCode: number;
  headers?: constant.objects;
  body?: constant.objects;
}

export default interface Rest extends BaseAction {
  endpoint: string;
  method: string;
  payload?: Payload;
  response: Response;
}
