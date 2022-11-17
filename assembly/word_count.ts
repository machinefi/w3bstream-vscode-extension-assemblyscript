import { GetDataByRID, GetDB, Log, SendTx, SetDB } from "./sdk";

export function start(rid: i32): i32 {
  Log("start from typescript4");
  const message = GetDataByRID(rid);
  let word = message.split("");
  SetDB("wordCount", word.length);
  let value = GetDB("wordCount");
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
