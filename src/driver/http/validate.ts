import { Rest } from "../../model";
import { findInList } from "../../util";
import { Result } from "./../../model/action";

export default function validate(action: Rest): Result {
  let result: Result = {};
  if (!action.type) {
    result.error = `❌ type is empty`;
    return result;
  }
  if (action.type != "rest") {
    result.error = `❌ type is not rest`;
    return result;
  }
  if (!action.endpoint) {
    result.error = `❌ endpoint is empty`;
    return result;
  }
  if (!action.method) {
    result.error = `❌ method is empty`;
    return result;
  }
  if (
    !findInList(
      ["get", "post", "put", "patch", "delete"],
      action.method.toLocaleLowerCase()
    )
  ) {
    result.error = `❌ method ${action.method} is not found`;
    return result;
  }
  if (!action.response) {
    result.error = `❌ response is empty`;
    return result;
  }
  if (!action.response.statusCode) {
    result.error = `❌ response.statusCode is empty`;
    return result;
  }

  return result;
}
