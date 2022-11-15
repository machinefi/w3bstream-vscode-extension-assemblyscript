import { GetDataByRID, GetDB, Log, SendTx, SetDB } from "./sdk";
import {
  JSON,
  JSONEncoder,
} from "../node_modules/assemblyscript-json/assembly/index";
//https://www.npmjs.com/package/assemblyscript-json

export function start(rid: i32): i32 {
  Log("start from typescript");
  const message = GetDataByRID(rid);
  Log("wasm received message:" + message);

  //   {
  //     "employees": {
  //       "employee": [
  //         {
  //           "id": "1",
  //           "firstName": "Tom",
  //           "lastName": "Cruise",
  //           "photo": "https://jsonformatter.org/img/tom-cruise.jpg"
  //         },
  //         {
  //           "id": "2",
  //           "firstName": "Maria",
  //           "lastName": "Sharapova",
  //           "photo": "https://jsonformatter.org/img/Maria-Sharapova.jpg"
  //         },
  //         {
  //           "id": "3",
  //           "firstName": "Robert",
  //           "lastName": "Downey Jr.",
  //           "photo": "https://jsonformatter.org/img/Robert-Downey-Jr.jpg"
  //         }
  //       ]
  //     }
  //   }

  let jsonObj: JSON.Obj = <JSON.Obj>(
    JSON.parse(
      '{"employees":{"employee":[{"id":"1","firstName":"Tom","lastName":"Cruise","photo":"https://jsonformatter.org/img/tom-cruise.jpg"},{"id":"2","firstName":"Maria","lastName":"Sharapova","photo":"https://jsonformatter.org/img/Maria-Sharapova.jpg"},{"id":"3","firstName":"Robert","lastName":"Downey Jr.","photo":"https://jsonformatter.org/img/Robert-Downey-Jr.jpg"}]}}'
    )
  );
  let employeesOrNull: JSON.Obj | null = jsonObj.getObj("employees");
  if (employeesOrNull != null) {
    let employees: JSON.Obj = employeesOrNull;
    let employeeOrNull: JSON.Arr | null = employees.getArr("employee");
    if (employeeOrNull != null) {
      let employee: JSON.Arr = employeeOrNull;
      let valueOfArray: JSON.Value[] = employee.valueOf();
      for (let i = 0; i < valueOfArray.length; i++) {
        let value: JSON.Value = valueOfArray[i];
        let employeeObj: JSON.Obj = <JSON.Obj>value;
        let firstNameOrNull: JSON.Str | null =
          employeeObj.getString("firstName");
        if (firstNameOrNull != null) {
          let firstName: string = firstNameOrNull.valueOf();
          Log("firstName:" + firstName);
        }
        let lastNameOrNull: JSON.Str | null = employeeObj.getString("lastName");
        if (lastNameOrNull != null) {
          let lastName: string = lastNameOrNull.valueOf();
          Log("lastName:" + lastName);
        }
        let photoOrNull: JSON.Str | null = employeeObj.getString("photo");
        if (photoOrNull != null) {
          let photo: string = photoOrNull.valueOf();
          Log("photo:" + photo);
        }
      }
    }
  }

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
