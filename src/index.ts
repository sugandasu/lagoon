import fs from "fs";
import NewAction from "./lib/action";
import { Tester } from "./model";
import ActionConfig from "./model/action";
import logResults from "./util/logResults";

const main = async () => {
  let tester = readTesterFile("tester/2023-07-27.json");
  tester.actions.forEach(async (actionConfig: ActionConfig) => {
    try {
      let action = NewAction(actionConfig);
      let result = await action.start();
      if (result.error) {
      }
      if (result.data) {
        logResults(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

function readTesterFile(fileName: string): Tester {
  let readFile = fs.readFileSync(fileName);
  let tester: Tester = JSON.parse(readFile.toString());
  return tester;
}

main().catch((err) => {
  console.log("error run main: ", err);
});
