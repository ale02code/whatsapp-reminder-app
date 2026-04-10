import { useState } from "react";
import Whatsapp from "./Whatsapp";
import FutureMessage from "./FutureMessage";
import InstantMessage from "./InstantMessage";
import SettingsIcon from "../imgs/settings.svg";

const components = {
  1: <Whatsapp />,
  2: <InstantMessage />,
  3: <FutureMessage />,
};

function Settings() {
  const [open, setOpen] = useState(false);
  const [windowVisibility, setWindowVisibility] = useState(null);

  const handleOpen = () => setOpen((prev) => !prev);
  const handleChangeWindowVisibility = (num) => {
    setWindowVisibility(num);
  };

  return (
    <div>
      <img
        onClick={handleOpen}
        className="h-10 w-10 absolute right-4 top-4 z-30"
        src={SettingsIcon}
        alt="settings icon"
      />

      {open && (
        <section className="h-screen w-full absolute left-0 top-0 bg-black/75 z-20 flex justify-center items-center">
          <div className="h-100 min-w-150 w-4/5 bg-white overflow-hidden rounded-lg">
            <header>
              <nav className="p-2 flex justify-around">
                <p
                  onClick={() => handleChangeWindowVisibility(1)}
                  className="cursor-pointer"
                >
                  WhatsApp
                </p>
                <p
                  onClick={() => handleChangeWindowVisibility(2)}
                  className="cursor-pointer"
                >
                  Mensaje inmediato
                </p>
                <p
                  onClick={() => handleChangeWindowVisibility(3)}
                  className="cursor-pointer"
                >
                  Mensaje futuro
                </p>
              </nav>
            </header>
            <main className="h-full w-full text-xl flex justify-center items-center">
              {windowVisibility === null ? (
                <h5>Elige alguna de las configuraciones...</h5>
              ) : (
                components[windowVisibility]
              )}
            </main>
          </div>
        </section>
      )}
    </div>
  );
}

export default Settings;
