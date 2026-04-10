import { useCreditViewContext } from "../contexts/CreditViewContext";
import { useDataContext } from "../contexts/DataContext";
import { useMessagesContentContext } from "../contexts/MessagesContentContext";
import { useEffect, useState } from "react";
import { day } from "../utils/dateUtils";
import FiltersSearch from "./FiltersSearch";
import removeImg from "../imgs/remove.png";

function CreditView() {
  const { visibility, setVisibility } = useCreditViewContext();
  const { data } = useDataContext();
  const { instant } = useMessagesContentContext();

  const [filterName, setFilterName] = useState("");
  const [filterPlate, setFilterPlate] = useState("");
  const [rows, setRows] = useState([]);

  const [viewMode, setViewMode] = useState("current");

  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.name?.toLowerCase().includes(filterName.toLowerCase()) &&
      row.license_plate?.toLowerCase().includes(filterPlate.toLowerCase());

    const rowDay = Number(row.payday);
    let matchesDate = false;

    if (viewMode === "current") {
      matchesDate = rowDay === day;
    } else if (viewMode === "future") {
      matchesDate = rowDay === day + 3;
    }

    return matchesSearch && matchesDate;
  });

  useEffect(() => {
    setRows(filteredData.map((row) => ({ ...row, selected: true })));
  }, [data, filterName, filterPlate, viewMode]);

  const toggleRow = (index) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, selected: !row.selected } : row,
      ),
    );
  };

  const selectedRows = rows.filter((row) => row.selected);

  //whatsapp
  const handleSendMessages = async () => {
    const defaultMessage =
      "Estimado ${name} , le saludamos de Credit Car, le recordamos que la cuota de su préstamo vence este día. Le invitamos a realizar su pago en cualquiera de nuestras cuentas autorizadas y a enviarnos el comprobante correspondiente para poder procesarlo oportunamente. ¡Gracias por su puntualidad!";

    const messages = selectedRows.map((row) => {
      const template =
        instant && instant.trim() !== "" ? instant : defaultMessage;
      const textWithValues = template.replace(/\${(\w+)}/g, (match, key) => {
        return row[key] !== undefined ? row[key] : match;
      });

      return {
        phone: row.phone,
        text: textWithValues,
      };
    });

    try {
      await window.whatsapp.sendMessages(messages);
      alert("Mensajes enviados exitosamente");
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un error");
    }
  };

  return (
    <div
      className={
        visibility
          ? "absolute h-screen w-screen bg-black/75 flex flex-col justify-center items-center"
          : "hidden"
      }
    >
      <header className="bg-neutral-300 h-16 w-4/5 p-2 flex justify-center items-center relative">
        <img
          className="h-12 absolute left-5 cursor-pointer"
          onClick={() => setVisibility(!visibility)}
          src={removeImg}
          alt="x-icon"
        />
        <nav className="flex justify-center items-center gap-4 text-lg">
          {/* 4. Botones con lógica de cambio de estado y estilo activo */}
          <li
            className={`list-none cursor-pointer transition-all ${viewMode === "current" ? "font-bold text-sky-800 border-b-2 border-sky-800" : "text-gray-600"}`}
            onClick={() => setViewMode("current")}
          >
            Actuales
          </li>
          <p className="text-gray-400">|</p>
          <li
            className={`list-none cursor-pointer transition-all ${viewMode === "future" ? "font-bold text-sky-800 border-b-2 border-sky-800" : "text-gray-600"}`}
            onClick={() => setViewMode("future")}
          >
            Futuros (3 días)
          </li>
        </nav>
        <button
          onClick={handleSendMessages}
          className="absolute right-5 bg-sky-800 text-white p-2 rounded-lg hover:bg-sky-900"
        >
          Send Messages ({selectedRows.length})
        </button>
      </header>

      <section className="h-100 min-w-150 w-4/5 bg-white overflow-x-hidden overflow-y-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-sky-800 text-white sticky top-0">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">N°</th>
              <th className="px-4 py-3">Nombres</th>
              <th className="px-4 py-3">Apellidos</th>
              <th className="px-4 py-3">Vehículo</th>
              <th className="px-4 py-3">Placa</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3 text-center">Día</th>
              <th className="px-4 py-3">Cuota</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-sky-50"
              >
                <td className="px-4 py-3">
                  <input
                    className="w-5 h-5 cursor-pointer"
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => toggleRow(index)}
                  />
                </td>
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.lastName}</td>
                <td className="px-4 py-3">{row.model}</td>
                <td className="px-4 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {row.license_plate}
                  </span>
                </td>
                <td className="px-4 py-3">{row.status}</td>
                <td className="px-4 py-3">{row.phone}</td>
                <td className="px-4 py-3 text-center">{row.payday}</td>
                <td className="px-4 py-3 font-medium text-sky-800">
                  {row.share}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <FiltersSearch
        filterName={filterName}
        setFilterName={setFilterName}
        filterPlate={filterPlate}
        setFilterPlate={setFilterPlate}
      />
    </div>
  );
}

export default CreditView;
