import { Action, Rest, Tester } from "../model";
import { Result } from "../model/action";
import * as http from "./http";

export function validateTester(tester: Tester): Result {
  let result: Result = {};
  if (!tester.name) {
    result.data?.push(`❌ tester name is empty`);
  }

  return result;
}

export function validateActions(actions: Action[]): Result {
  let result: Result = {};

  for (let i = 0; i < actions.length; i++) {
    let result = validateAction(actions[i]);
    if (result.error) {
      return result;
    }
  }

  return result;
}

export function validateAction(action: Action): Result {
  let result: Result = {};
  if (!action.type) {
    result.error = `❌ action type is empty`;
    return result;
  }

  if (action.type == "rest") {
    let result = http.validate(action as Rest);
    if (result.error) {
      return result;
    }
  }

  return result;
}

export async function startActions(actions: Action[]): Promise<Result> {
  let result: Result = {
    data: [],
  };
  if (actions.length == 0) {
    return result;
  }

  for (let i = 0; i < actions.length; i++) {
    let actionResult = await startAction(actions[i]);
    if (actionResult.error) {
      return actionResult;
    }

    result.data?.push(`Action ${i + 1}`);
    if (actionResult.data) {
      result.data?.push(...actionResult.data);
    }
    result.data?.push(`\n`);
  }

  return result;
}

export async function startAction(action: Action): Promise<Result> {
  let result: Result = {};
  if (action.type == "rest") {
    let startResult = await http.start(action as Rest);
    return startResult;
  }

  return result;
}
