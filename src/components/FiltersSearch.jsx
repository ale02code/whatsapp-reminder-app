function FiltersSearch({
  filterName,
  setFilterName,
  filterPlate,
  setFilterPlate,
}) {
  return (
    <footer className="bg-neutral-300 h-16 w-4/5 p-2 flex gap-5 justify-between items-center relative">
      <div className="flex gap-4 justify-center items-center px-5">
        Filters
        <input
          type="text"
          className="bg-white py-1 px-2 rounded-xl outline-none"
          placeholder="Name..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="text"
          className="bg-white py-1 px-2 rounded-xl outline-none"
          placeholder="Placa..."
          value={filterPlate}
          onChange={(e) => setFilterPlate(e.target.value)}
        />
      </div>
      <button
        className="p-2 bg-red-500 text-white rounded-lg cursor-pointer outline-none"
        onClick={() => {
          setFilterName("");
          setFilterPlate("");
        }}
      >
        Eliminar Filtros
      </button>
    </footer>
  );
}

export default FiltersSearch;
