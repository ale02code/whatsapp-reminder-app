import { useExcelReader } from "../hooks/useExcelReader";
import folderIcon from "../imgs/folder.png";

let buttonStyle = "p-2 font-semibold rounded-md cursor-pointer";

function ExcelUploader() {
  const { file, data, readFile, clearFile } = useExcelReader();

  const handleUploadFile = (e) => {
    const fileUpload = e.target.files[0];
    readFile(fileUpload);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    readFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
            <button className="bg-green-300 w-auto rounded-xl relative z-0 overflow-hidden py-1 px-2">
              Cargar Archivo
              <input
                className="absolute z-10 left-0 opacity-0"
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
            clearFile();
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
