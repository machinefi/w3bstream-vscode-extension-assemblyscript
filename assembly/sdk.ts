@external("env", "ws_log")
declare function ws_log(logLevel:u8, ptr: usize, size: usize): i32

@external("env", "ws_set_db")
declare function ws_set_db(key_ptr:usize,ket_size:i32,return_ptr:usize,return_size:i32): i32

@external("env", "ws_get_db")
declare function ws_get_db(addr:usize,size:usize,rAddr:usize,rSize:u32): i32

@external("env", "ws_get_data")
declare function ws_get_data(rid: i32, ptr: u32 , size:u32): i32

@external("env", "ws_set_data")
declare function ws_set_data(rid: i32, ptr: usize , size:u32): i32

@external("env", "ws_send_tx")
declare function ws_send_tx(ptr: usize , size:u32): i32

export function Log(message: string):i32 {
    let strEncoded = String.UTF8.encode(message, true);
    let message_ptr = changetype<usize>(strEncoded);
    let message_size = strEncoded.byteLength - 1;
    ws_log(3, message_ptr, message_size); // logInfoLevel = 3
    return 0;
};

export function SetDB(key: string, value: i32):i32 {
    let keyEncoded = String.UTF8.encode(key, true);
    let key_ptr = changetype<usize>(keyEncoded);
    let key_size = keyEncoded.byteLength - 1;
    let valueEncoded = String.UTF8.encode(value.toString(), true);
    let value_ptr = changetype<usize>(valueEncoded);
    let value_size = valueEncoded.byteLength - 1;
    ws_set_db(key_ptr, key_size, value_ptr, value_size);
    return 0;
}

export function GetDB(key: string):i32 {
    let keyEncoded = String.UTF8.encode(key, true);
    let key_ptr = changetype<usize>(keyEncoded);
    let key_size = keyEncoded.byteLength - 1;

    let valueEncoded = String.UTF8.encode("0", true);
    let value_ptr = changetype<usize>(valueEncoded);
    let value_size = valueEncoded.byteLength - 1;
    //todo fix bug
    return ws_get_db(key_ptr, key_size, value_ptr, value_size);
}

export function GetDataByRID(rid: i32): string {
    let data_ptr = changetype<usize>(0);
    let size_ptr = changetype<usize>(0);
    //todo fix bug
    Log("GetDataByRID" +rid.toString());
    let code = ws_get_data(rid, u32(data_ptr) , u32(size_ptr));
    Log("code:" + code.toString());
    return code.toString()
    // if(code == 0){
    //     const dataBuffer = new ArrayBuffer(size_size);
    //     memory.copy(data_ptr, changetype<usize>(dataBuffer), size_size);
    //     return String.UTF8.decode(dataBuffer, true);
    // }
    // return "";
}

export function SendTx(tx: string):i32 {
    let txEncoded = String.UTF8.encode(tx, true);
    let tx_ptr = changetype<usize>(txEncoded);
    let tx_size = txEncoded.byteLength - 1;
    return ws_send_tx(tx_ptr, tx_size);
}