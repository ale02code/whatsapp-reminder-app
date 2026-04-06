import { useState } from "react";
import * as XLSX from "xlsx";

const allowedStatus = [
  "REVISAR PROMESA DE PAGO Y APAGAR",
  "REVISION DE CASO Y CONFIRMAR DATOS",
  "EVALUAR SI PROCEDE DESCONEXION",
  "GESTION ASEGURADORA",
  "GESTION DE COBRO ADMINISTRATIVO",
  "JURIDICO EU",
  "OFRECER REFINANCIAMIENTO",
  "PROCEDER CON LA RECUPERACION",
  "APAGAR GPS",
  "ASIGNADO A ABOGADO",
  "CONCESIÓN CONFIRMADA",
  undefined,
];

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
          && allowedStatus.includes(row["STATUS"]?.toUpperCase())
        )
        .map((row) => ({
          name: row["NOMBRES"],
          lastName: row["APELLIDOS"],
          model: row["VEHICULO"],
          license_plate: row["PLACA"],
          phone: row["TELEFONO 1"],
          payday: row["DIA"],
          share: row["CUOTA"],
          status: row["STATUS"]
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