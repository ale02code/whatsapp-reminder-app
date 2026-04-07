import { useEffect, useState } from "react";
import QRCode from "qrcode";

function QRDisplay() {
  const [qrUrl, setQrUrl] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    window.whatsapp.onQR(async (qr) => {
      const url = await QRCode.toDataURL(qr);
      setQrUrl(url);
    });

    window.whatsapp.onReady(() => {
      setConnected(true);
      setQrUrl(null);
    });
  }, []);

  if (connected)
    return <p className="text-green-500 font-bold">WhatsApp conectado</p>;

  return (
    <div className="text-center">
      {qrUrl ? (
        <img src={qrUrl} alt="QR WhatsApp" className="w-48 h-48 mx-auto" />
      ) : (
        <p>Esperando QR...</p>
      )}
    </div>
  );
}

export default QRDisplay;
