import * as constant from "../constant";
import { BaseAction } from "./action";

export interface Payload {
  headers: Map<string, string>;
  body: Map<string, constant.primitives>;
}

export interface Response {
  statusCode: number;
  headers: Map<string, string>;
  body: Map<string, constant.primitives>;
}

export default interface Rest extends BaseAction {
  endpoint: string;
  method: string;
  payload: Payload;
  respose: Response;
}
