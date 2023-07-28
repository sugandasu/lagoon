import fs from "fs";
import * as driver from "./driver";
import * as model from "./model";

const main = async () => {
  let tester = readTesterFile("tester/2023-07-27.json");
  let err = driver.validateTester(tester);
  if (err != undefined) {
    console.log(err);
  }
  err = driver.validateActions(tester.actions);
  if (err != undefined) {
    console.log(err);
  }
};

function readTesterFile(fileName: string): model.Tester {
  let readFile = fs.readFileSync(fileName);
  let tester: model.Tester = JSON.parse(readFile.toString());
  return tester;
}

main().catch((err) => {
  console.log("error run main: ", err);
});
