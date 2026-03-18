import * as XLSX from "xlsx";
import { useState } from "react";

let textDefaultToDrag = "Arrastra tu archivo .xlsx o .xls aquí";

function ExcelUploader() {
  const [file, setFile] = useState();

  // const handleReader = (file) => {
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const workbook = XLSX.read(event.target.result, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const data = XLSX.utils.sheet_to_json(sheet);
  //     console.log(data);
  //   };

  //   reader.readAsBinaryString(file);
  // };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      alert("Solo se aceptan archivos .xlsx y .xls");
      return;
    }

    setFile(file);

    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, {
        type: "binary",
        sheetRows: 6,
      });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { range: 1 });

      const headers = data.map((row) => ({
        names: row["NOMBRES"],
        lastNames: row["APELLIDOS"],
        car: row["VEHICULO"],
        identify: row["PLACA "],
        celNumber: row["TELEFONES 1"],
        share: row["CUOTA"],
      }));
      console.log(headers);
    };

    reader.readAsBinaryString(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-400 p-10 text-center cursor-pointer"
      >
        <p>{file ? file.name : textDefaultToDrag}</p>
      </div>
      {/* <button
        onClick={() =>
          file ? handleReader(file) : alert("Selecciona un archivo")
        }
        className="block bg-amber-300 uppercase rounded-md p-2 cursor-pointer"
      >
        Load File
      </button> */}
    </div>
  );
}

export default ExcelUploader;
