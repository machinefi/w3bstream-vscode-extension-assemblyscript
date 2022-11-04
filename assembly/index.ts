@external("env", "ws_log")
declare function ws_log(ptr: string, size: u32): void

@external("env", "ws_set_db")
declare function ws_set_db(key: string, key_size: u32, v: i32): void

@external("env", "ws_get_db")
declare function ws_get_db(key: string, key_size: u32): i32


export function start(rid: i32): i32 {
    const message = "Hello";
    ws_log(message, message.length);
    ws_set_db("key", 3, 1)
    const key = ws_get_db('key', 3);
    ws_log("key", 3)
    return 0
}
