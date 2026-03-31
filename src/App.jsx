import ExcelUploader from "./components/ExcelUploader";

function App() {
  return (
    <main className="w-screen h-dvh flex flex-col justify-center items-center">
      <h1 className="text-3xl capitalize font-bold mb-4">
        WhatsApp Reminder App
      </h1>
      <ExcelUploader />
    </main>
  );
}

export default App;
