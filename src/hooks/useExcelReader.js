import { useState } from "react";
import * as XLSX from "xlsx";

export function useExcelReader() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const readFile = (file) => {
    setFile(file);

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      alert("Solo se aceptan archivos .xlsx y .xls");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, {
        type: "binary",
        sheetRows: 800,
      });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { range: 1 });

      const headers = data.map((row) => ({
        names: row["NOMBRES"],
        lastNames: row["APELLIDOS"],
        car: row["VEHICULO"],
      }));
      console.log(headers);
    };
    reader.readAsBinaryString(file);
  };

  const clearFile = () => { setFile(null); setData([]); };

  return { file, data, readFile, clearFile }
}

// const file = e.dataTransfer.files[0];