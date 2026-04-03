import CreditView from "./components/CreditView";
import ExcelUploader from "./components/ExcelUploader";
import { CreditViewProvider } from "./contexts/CreditViewContext";

function App() {
  return (
    <main className="w-screen h-dvh flex flex-col justify-center items-center">
      <h1 className="text-3xl capitalize font-bold mb-4">
        WhatsApp Reminder App
      </h1>
      <CreditViewProvider>
        <ExcelUploader />
        <CreditView />
      </CreditViewProvider>
    </main>
  );
}

export default App;
