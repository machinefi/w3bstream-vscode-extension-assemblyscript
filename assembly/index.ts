import { GetDataByRID, GetDB, Log, SendTx, SetDB } from "./sdk";
import { JSON } from "../node_modules/assemblyscript-json/assembly/index";
//https://www.npmjs.com/package/assemblyscript-json

export function start(rid: i32): i32 {
  Log("start from typescript");
  const message = GetDataByRID(rid);
  Log("wasm received message:" + message);
  let jsonObj: JSON.Obj = <JSON.Obj>JSON.parse(message);
  let AccountOrNull: JSON.Str | null = jsonObj.getString("Account"); // This will return a JSON.Str or null
  if (AccountOrNull != null) {
    // use .valueOf() to turn the high level JSON.Str type into a string
    let Account: string = AccountOrNull.valueOf();
    Log("Account:" + Account);
  }
  let PointsOrNull: JSON.Integer | null = jsonObj.getInteger("Points");
  if (PointsOrNull != null) {
    let Points: i64 = PointsOrNull.valueOf();
    Log("Points:" + Points.toString());
  }
  //   SendTx(`
  // {
  //     "to": "0xb73eE6EB5b1984c78CCcC49eA7Ad773E71d74F51",
  //     "value": "0",
  //     "data": "40c10f190000000000000000000000009117f5EF4156709092f79740a97b1638cA399A000000000000000000000000000000000000000000000000000de0b6b3a7640000"
  // }`);
  SetDB("typescriptKey", 998);
  let value = GetDB("typescriptKey");
  Log("wasm get value:" + value.toString());
  return 0;
}

/**Export alloc for w3bstream vm */
export function alloc(size: usize): usize {
  return heap.alloc(size);
}

/**Export abort for assemblyScript special use */
function abort(
  message: string | null,
  fileName: string | null,
  lineNumber: u32,
  columnNumber: u32
): void {}
