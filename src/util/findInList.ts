export default function findInList<Type>(list: Type[], val: Type): boolean {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === val) {
      return true;
    }
  }

  return false;
}
