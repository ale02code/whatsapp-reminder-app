import { useState } from "react";
import * as XLSX from "xlsx";
import folderIcon from "../imgs/folder.png";

let buttonStyle = "p-2 font-semibold rounded-md cursor-pointer";

function ExcelUploader() {
  const [file, setFile] = useState(false);

  const handleUploadFile = (e) => {
    const fileUpload = e.target.files[0];

    setFile(fileUpload);

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

    reader.readAsBinaryString(fileUpload);
  };

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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDeleteFile = () => {
    setFile(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="w-3/5 border-2 flex flex-col justify-center items-center border-dashed border-gray-400 p-10 text-center cursor-pointer mb-4"
      >
        <img className="h-16" src={folderIcon} alt="Folder Icon" />
        {file ? (
          <p>{file.name}</p>
        ) : (
          <div>
            <div className="mb-4">
              <h3>Arrastra tu archivo aquí</h3>
              <p className="text-sm">
                Compatible con{" "}
                <span className="py-[.8] px-2 bg-green-300 rounded-xl">
                  .xlsx
                </span>{" "}
                <span className="py-[.8] px-2 bg-green-300 rounded-xl">
                  .xls
                </span>
              </p>
            </div>
            <button className={`${buttonStyle} bg-green-400 relative`}>
              Cargar Archivo
              <input
                className="left-0 absolute opacity-0"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleUploadFile}
              />
            </button>
          </div>
        )}
      </div>
      <section className="flex justify-center items-center gap-2">
        <button
          onClick={() => {
            handleDeleteFile();
          }}
          className={`${buttonStyle} bg-red-400 relative`}
        >
          Eliminar Archivo
        </button>
        <button className={`${buttonStyle} bg-blue-400`}>
          Confirmar Archivo
        </button>
      </section>
    </div>
  );
}

export default ExcelUploader;
