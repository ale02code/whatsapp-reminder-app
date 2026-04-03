import { useCreditViewContext } from "../contexts/CreditViewContext";
import { useDataContext } from "../contexts/DataContext";
import { useEffect } from "react";

function CreditView() {
  // Contexts
  const { visibility, setVisibility } = useCreditViewContext();
  const { data } = useDataContext();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div
      className={
        visibility
          ? "absolute h-screen w-screen bg-black/75 flex justify-center items-center"
          : "hidden"
      }
    >
      <section className="h-[400px] min-w-[600px] w-4/5 bg-white">
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
            {data.map((row, index) => (
              <tr key={index}>
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
    </div>
  );
}

export default CreditView;
