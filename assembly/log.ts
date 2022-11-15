import { GetDataByRID, Log } from "./sdk";

export function start(rid: i32): i32 {
  Log("start from typescript");
  const message = GetDataByRID(rid);
  Log("wasm received message:" + message);
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
