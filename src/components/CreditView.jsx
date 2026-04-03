import { useCreditViewContext } from "../contexts/CreditViewContext";
import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";
import FiltersSearch from "./FiltersSearch";
import removeImg from "../imgs/remove.png";

function CreditView() {
  // Contexts
  const { visibility, setVisibility } = useCreditViewContext();
  const { data } = useDataContext();

  // UseStates
  const [filterName, setFilterName] = useState("");
  const [filterPlate, setFilterPlate] = useState("");

  const filteredData = data.filter(
    (row) =>
      row.name?.toLowerCase().includes(filterName.toLowerCase()) &&
      row.license_plate?.toLowerCase().includes(filterPlate.toLowerCase()),
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

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
        <button className="absolute right-5 bg-sky-800 text-white p-2 rounded-lg">
          Send Messages
        </button>
      </header>
      <section className="h-100 min-w-150 w-4/5 bg-white overflow-x-hidden overflow-y-auto py-1 px-5">
        <table>
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Vehículo</th>
              <th>Placa</th>
              <th>Teléfono</th>
              <th>Día de pago</th>
              <th>Cuota</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, _) => (
              <tr key={_}>
                <td>{row.name}</td>
                <td>{row.lastName}</td>
                <td>{row.model}</td>
                <td>{row.license_plate}</td>
                <td>{row.phone}</td>
                <td>{row.payday}</td>
                <td>{row.share}</td>
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
