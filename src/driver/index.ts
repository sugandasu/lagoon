import chalk from "chalk";
import * as model from "../model";
import * as http from "./http";

export function validateTester(tester: model.Tester): string | undefined {
  if (!tester.name) {
    return `${chalk.redBright("x")} tester name is empty`;
  }

  return;
}

export function validateActions(actions: model.Action[]): string | undefined {
  if (actions.length == 0) {
    return;
  }

  for (let i = 0; i < actions.length; i++) {
    let err = validateAction(actions[i]);
    if (err) {
      return `action ${i + 1} ${err}`;
    }
  }

  return;
}

export function validateAction(action: model.Action): string | undefined {
  if (!action.type) {
    return `${chalk.redBright("x")} action type is empty`;
  }

  if (action.type == "rest") {
    let err = http.validate(action as model.Rest);
    if (err) {
      return err;
    }
  }

  return;
}
