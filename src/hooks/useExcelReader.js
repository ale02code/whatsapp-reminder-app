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
        sheetRows: 1000,
      });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { range: 1, raw: false, });

      const headers = rows
        .filter(row => row["NOMBRES"]
          // && new Date(row["FECHA DE OTORGAMIENTO"]).getFullYear() == 2026
        )
        .map((row) => ({
          name: row["NOMBRES"],
          lastName: row["APELLIDOS"],
          model: row["VEHICULO"],
          license_plate: row["PLACA"],
          phone: row["TELEFONO 1"],
          payday: row["DIA"],
          share: row["CUOTA"],
          // status: row["STATUS"]
        }));
      setData(headers);
      console.log(headers);
    };
    reader.readAsBinaryString(file);
  };

  const clearFile = () => { setFile(null); setData([]); };

  return { file, data, readFile, clearFile }
}

// const file = e.dataTransfer.files[0];