import CreditView from "./components/CreditView";
import ExcelUploader from "./components/ExcelUploader";
import { CreditViewProvider } from "./contexts/CreditViewContext";
import { MessagesContentProvider } from "./contexts/MessagesContentContext";
import QRDisplay from "./components/QRDisplay";
import Settings from "./components/Settings";

function App() {
  return (
    <main className="w-screen h-dvh flex flex-col justify-center items-center">
      <MessagesContentProvider>
        <h1 className="text-3xl capitalize font-bold mb-4">
          WhatsApp Reminder App
        </h1>
        <Settings />
        <QRDisplay />
        <CreditViewProvider>
          <ExcelUploader />
          <CreditView />
        </CreditViewProvider>
      </MessagesContentProvider>
    </main>
  );
}

export default App;
