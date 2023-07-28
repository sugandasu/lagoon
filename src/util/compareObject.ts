import { objects } from "../constant";

export default function compareObjects(data: objects, comp: objects): boolean {
  let result = true;
  Object.keys(comp).forEach((key) => {
    if (typeof comp[key] == "object") {
      result = compareObjects(data[key], comp[key]);
    } else {
      result = data[key] == comp[key];
    }

    if (!result) {
      return;
    }
  });

  return result;
}
