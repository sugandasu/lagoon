import chalk from "chalk";
import { Rest } from "../../model";
import * as util from "../../util";

export default function validate(action: Rest): string | undefined {
  if (!action.type) {
    return `${chalk.redBright("x")} type is empty`;
  }
  if (action.type != "rest") {
    return `${chalk.redBright("x")} type is not rest`;
  }
  if (!action.endpoint) {
    return `${chalk.redBright("x")} endpoint is empty`;
  }
  if (!action.method) {
    return `${chalk.redBright("x")} method is empty`;
  }
  if (
    !util.findInList(
      ["get", "post", "put", "patch", "delete"],
      action.method.toLocaleLowerCase()
    )
  ) {
    return `${chalk.redBright("x")} method ${action.method} is not found`;
  }
  if (!action.respose) {
    return `${chalk.redBright("x")} response is empty`;
  }
  if (!action.respose.statusCode) {
    return `${chalk.redBright("x")} response.statusCode is empty`;
  }
}
