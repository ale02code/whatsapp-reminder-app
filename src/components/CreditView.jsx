import { useCreditViewContext } from "../contexts/CreditViewContext";
import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";
import { day } from "../utils/dateUtils";
import FiltersSearch from "./FiltersSearch";
import removeImg from "../imgs/remove.png";

function CreditView() {
  // Contexts
  const { visibility, setVisibility } = useCreditViewContext();
  const { data } = useDataContext();

  // UseStates
  const [filterName, setFilterName] = useState("");
  const [filterPlate, setFilterPlate] = useState("");
  const [rows, setRows] = useState([]);

  const filteredData = data.filter(
    (row) =>
      row.name?.toLowerCase().includes(filterName.toLowerCase()) &&
      row.license_plate?.toLowerCase().includes(filterPlate.toLowerCase()) &&
      Number(row.payday) === day,
  );

  useEffect(() => {
    setRows(filteredData.map((row) => ({ ...row, selected: true })));
  }, [data, filterName, filterPlate]);

  const toggleRow = (index) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, selected: !row.selected } : row,
      ),
    );
  };

  const selectedRows = rows.filter((row) => row.selected);

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
          className="h-12 absolute left-5"
          onClick={() => setVisibility(!visibility)}
          src={removeImg}
          alt="x-icon"
        />
        <nav className="flex justify-center items-center gap-2 text-lg">
          <li className="list-none cursor-pointer">Actuales</li>
          <p>|</p>
          <li className="list-none cursor-pointer">Futuros (3 dias)</li>
        </nav>
        <button
          onClick={() => console.log(selectedRows)}
          className="absolute right-5 bg-sky-800 text-white p-2 rounded-lg"
        >
          Send Messages
        </button>
      </header>
      <section className="h-100 min-w-150 w-4/5 bg-white overflow-x-hidden overflow-y-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-sky-800 text-white sticky top-0">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 font-medium"></th>
              <th className="px-4 py-3 font-medium">Nombres</th>
              <th className="px-4 py-3 font-medium">Apellidos</th>
              <th className="px-4 py-3 font-medium">Vehículo</th>
              <th className="px-4 py-3 font-medium">Placa</th>
              <th className="px-4 py-3 font-medium">Teléfono</th>
              <th className="px-4 py-3 font-medium">Día</th>
              <th className="px-4 py-3 font-medium">Cuota</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-sky-100 transition-colors"
              >
                <td className="px-4 py-3">
                  <input
                    className="w-5 h-5 outline-none"
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => toggleRow(index)}
                  />
                </td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.lastName}</td>
                <td className="px-4 py-3">{row.model}</td>
                <td className="px-4 py-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">
                    {row.license_plate}
                  </span>
                </td>
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
