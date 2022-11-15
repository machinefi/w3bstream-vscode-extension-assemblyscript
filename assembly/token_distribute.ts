import { GetDataByRID, GetDB, Log, SendTx, SetDB } from "./sdk";
import { JSON } from "../node_modules/assemblyscript-json/assembly/index";
//https://www.npmjs.com/package/assemblyscript-json

export function start(rid: i32): i32 {
  Log("start from typescript");
  const message = GetDataByRID(rid);
  Log("wasm received message:" + message);
  const ERC20Addr = `0xb73eE6EB5b1984c78CCcC49eA7Ad773E71d74F51`;
  const account = `9117f5EF4156709092f79740a97b1638cA399A00`;
  SendTx(`
  {
      "to": "${ERC20Addr}",
      "value": "0",
      "data": "40c10f19000000000000000000000000${account}0000000000000000000000000000000000000000000000000de0b6b3a7640000"
  }`);
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
