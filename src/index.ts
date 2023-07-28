import fs from "fs";
import * as driver from "./driver";
import { Tester } from "./model";
import logResults from "./util/logResults";

const main = async () => {
  let tester = readTesterFile("tester/2023-07-27.json");
  let result = driver.validateTester(tester);
  if (result.error) {
    console.log(result.error);
    return;
  }
  result = await driver.startActions(tester.actions);
  if (result.error) {
    console.log(result);
    return;
  }

  if (result.data) {
    logResults(result.data);
  }
};

function readTesterFile(fileName: string): Tester {
  let readFile = fs.readFileSync(fileName);
  let tester: Tester = JSON.parse(readFile.toString());
  return tester;
}

main().catch((err) => {
  console.log("error run main: ", err);
});
