import { objects } from "../constant";
import { BaseActionConfig } from "./action";

export interface RestPayload {
  multipart?: boolean;
  headers?: objects;
  body?: objects;
}

export interface RestResponse {
  statusCode: number;
  headers?: objects;
  body?: objects;
}

export default interface RestActionConfig extends BaseActionConfig {
  endpoint: string;
  method: string;
  payload?: RestPayload;
  response: RestResponse;
}
