import { read, utils } from "xlsx";

export const getEmployees = async (state) => {
    let employees = [];
    // read excel file
    if (
      state.csv.filename.endsWith("xlsx") ||
      state.csv.filename.endsWith("xls")
    ) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const workbook = read(e.target.result);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = utils.sheet_to_json(worksheet, { header: 1 });
        const headers = data[0];
        let name = 0;
        let email = 1;

        if (headers[0].toLowerCase().includes("name")) {
          name = 0;
        } else if (headers[1].toLowerCase().includes("name")) {
          name = 1;
        }

        if (headers[0].toLowerCase().includes("email")) {
          email = 0;
        } else if (headers[1].toLowerCase().includes("email")) {
          email = 1;
        }

        for (let i = 1; i < data.length; i++) {
          employees.push({ name: data[i][name], email: data[i][email] });
        }
      };
      reader.readAsArrayBuffer(state.csv.data);
      return employees;
    }

    // Read csv file
    if (state.csv.filename.endsWith("csv")) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const result = event.target.result;

        const data = result.split("\n");
        // Starting at 1 to skip over header
        for (let i = 1; i < data.length; i++) {
          if (!data[i]) break;
          const rowItems = data[i].split(",");

          const employee = {
            name: rowItems[0].trim(),
            email: rowItems[1].trim(),
          };
          employees.push(employee);
        }
      };
      reader.readAsText(state.csv.data);
      return employees;
    }
    return employees;
  };