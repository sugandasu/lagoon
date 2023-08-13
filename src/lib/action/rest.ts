import axios, { AxiosHeaders, AxiosResponse } from "axios";
import FormData from "form-data";
import fs from "fs";
import { Action } from ".";
import RestActionConfig from "../../model/rest";
import { compareObjects, findInList } from "../../util";
import { Result } from "./../../model/action";

export class RestAction implements Action {
  config: RestActionConfig;

  constructor(cfg: RestActionConfig) {
    this.config = cfg;
  }

  async start(): Promise<Result> {
    let result: Result = {
      data: [],
    };

    let err = this.validate();
    if (!err) {
      result.error = err;
      return result;
    }

    let multipart = false;
    let body = new FormData();
    let headers = new AxiosHeaders();

    if (this.config.payload?.multipart) {
      multipart = this.config.payload?.multipart;
      headers.set("Content-Type", "multipart/form-data");
    }

    if (this.config.payload?.headers) {
      Object.keys(this.config.payload.headers).forEach((key) => {
        if (this.config.payload?.headers)
          headers.set(key, this.config.payload.headers[key]);
      });
    }

    if (this.config.payload?.body) {
      Object.keys(this.config.payload.body).forEach((key) => {
        if (this.config.payload?.body) {
          let val = this.config.payload.body[key];
          if (multipart) {
            let valString = val as string;
            valString.includes("file: ");
            let valStringSplit = valString.split("file: ");
            if (valStringSplit.length == 2) {
              body.append(key, fs.createReadStream(valStringSplit[1]));
            }
          } else {
            body.append(key, val);
          }
        }
      });
    }

    let response = await axios({
      method: this.config.method,
      url: this.config.endpoint,
      headers: headers,
      data: body,
    }).then((result: AxiosResponse) => {
      return result;
    });

    if (response.status == this.config.response.statusCode) {
      result.data?.push(`✅ response status is expected ${response.status}`);
    }

    if (this.config.response?.body) {
      if (!compareObjects(response.data, this.config.response.body)) {
        result.data?.push(
          `❌ response body is not expected, expect ${this.config.response?.body} get ${response.data}`
        );
      } else {
        result.data?.push(`✅ response is expected`);
      }
    }

    return result;
  }

  validate(): Result {
    let result: Result = {};
    if (!this.config.type) {
      result.error = `❌ type is empty`;
      return result;
    }
    if (this.config.type != "rest") {
      result.error = `❌ type is not rest`;
      return result;
    }
    if (!this.config.endpoint) {
      result.error = `❌ endpoint is empty`;
      return result;
    }
    if (!this.config.method) {
      result.error = `❌ method is empty`;
      return result;
    }
    if (
      !findInList(
        ["get", "post", "put", "patch", "delete"],
        this.config.method.toLocaleLowerCase()
      )
    ) {
      result.error = `❌ method ${this.config.method} is not found`;
      return result;
    }
    if (!this.config.response) {
      result.error = `❌ response is empty`;
      return result;
    }
    if (!this.config.response.statusCode) {
      result.error = `❌ response.statusCode is empty`;
      return result;
    }

    return result;
  }
}
