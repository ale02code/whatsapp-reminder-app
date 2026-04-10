import { useMessagesContentContext } from "../contexts/MessagesContentContext";

function InstantMessage() {
  const { instant, setInstant } = useMessagesContentContext();

  const handleSaveMessage = (e) => {
    setInstant(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <p className="text-lg px-10">
        Nota: Puedes ocupar estas variables para tu mensaje <span>name, </span>
        <span>lastName, </span>
        <span>model, </span>
        <span>license_plate, </span>
        <span>phone, </span>
        <span>payday, </span>
        <span>share, </span>
        <span>status. </span>
        {/* Solamente tienes que poner ${variable} */}
      </p>
      <textarea
        className="w-1/2 bg-neutral-300"
        onChange={handleSaveMessage}
      ></textarea>
      <button className="py-1 px-2 bg-green-400 rounded-lg">Guardar</button>
    </div>
  );
}

export default InstantMessage;
