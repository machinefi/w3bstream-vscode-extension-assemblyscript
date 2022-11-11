import { GetDataByRID, GetDB, Log, SendTx, SetDB } from "./sdk";

export function start(rid: i32): i32 {
  Log("start");
  //   const message = GetDataByRID(rid);
  //   Log("wasm received message:" + message);
  SendTx(`
{
    "to": "0xb73eE6EB5b1984c78CCcC49eA7Ad773E71d74F51",
    "value": "0",
    "data": "40c10f190000000000000000000000009117f5EF4156709092f79740a97b1638cA399A000000000000000000000000000000000000000000000000000de0b6b3a7640000"
}`);
  //   SetDB("key001", 1);
  //   let value = GetDB("key001");
  //   Log("wasm get value:" + value.toString());
  return 0;
}

function abort(
  message: string | null,
  fileName: string | null,
  lineNumber: u32,
  columnNumber: u32
): void {}
