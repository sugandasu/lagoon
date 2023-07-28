import axios, { AxiosHeaders } from "axios";
import FormData from "form-data";
import fs from "fs";
import { Rest } from "../../model";
import { compareObjects } from "../../util";
import { Result } from "./../../model/action";
import validate from "./validate";

export default async function start(action: Rest): Promise<Result> {
  let result: Result = {
    data: [],
  };

  let err = validate(action);
  if (!err) {
    result.error = err;
    return result;
  }

  let multipart = false;
  let body = new FormData();
  let headers = new AxiosHeaders();

  if (action.payload?.multipart) {
    multipart = action.payload?.multipart;
    headers.set("Content-Type", "multipart/form-data");
  }

  if (action.payload?.headers) {
    Object.keys(action.payload.headers).forEach((key) => {
      if (action.payload?.headers)
        headers.set(key, action.payload.headers[key]);
    });
  }

  if (action.payload?.body) {
    Object.keys(action.payload.body).forEach((key) => {
      if (action.payload?.body) {
        let val = action.payload.body[key];
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
    method: action.method,
    url: action.endpoint,
    headers: headers,
    data: body,
  }).then((result) => {
    return result;
  });

  if (response.status == action.response.statusCode) {
    result.data?.push(`✅ response status is expected ${response.status}`);
  }

  if (action.response?.body) {
    if (!compareObjects(response.data, action.response.body)) {
      result.data?.push(
        `❌ response body is not expected, expect ${action.response?.body} get ${response.data}`
      );
    } else {
      result.data?.push(`✅ response is expected`);
    }
  }

  return result;
}
