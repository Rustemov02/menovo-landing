import { QRCodeCanvas } from "qrcode.react";

const CARD_WIDTH = 400;
const CARD_HEIGHT = 480;
const PADDING = 30;
const HEADER_HEIGHT = 60;
const FOOTER_HEIGHT = 70;

interface MasterQRPanelProps {
  restaurantSlug: string;
}

export default function MasterQRPanel({ restaurantSlug }: MasterQRPanelProps) {
  const menuUrl = `${window.location.origin}/${restaurantSlug}`;

  const downloadQR = () => {
    const qrCanvas = document.getElementById(
      "master-qr-code",
    ) as HTMLCanvasElement | null;
    if (!qrCanvas) return;

    const compositeCanvas = document.createElement("canvas");
    compositeCanvas.width = CARD_WIDTH;
    compositeCanvas.height = CARD_HEIGHT;
    const ctx = compositeCanvas.getContext("2d");
    if (!ctx) return;

    const qrSize = 220;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

    const radius = 16;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(CARD_WIDTH - radius, 0);
    ctx.quadraticCurveTo(CARD_WIDTH, 0, CARD_WIDTH, radius);
    ctx.lineTo(CARD_WIDTH, CARD_HEIGHT - radius);
    ctx.quadraticCurveTo(CARD_WIDTH, CARD_HEIGHT, CARD_WIDTH - radius, CARD_HEIGHT);
    ctx.lineTo(radius, CARD_HEIGHT);
    ctx.quadraticCurveTo(0, CARD_HEIGHT, 0, CARD_HEIGHT - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#e1e3e4";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#ab2e00";
    ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("FastQR", CARD_WIDTH / 2, PADDING + HEADER_HEIGHT / 2);

    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PADDING, PADDING + HEADER_HEIGHT + 8);
    ctx.lineTo(CARD_WIDTH - PADDING, PADDING + HEADER_HEIGHT + 8);
    ctx.stroke();

    const qrX = (CARD_WIDTH - qrSize) / 2;
    const qrY = PADDING + HEADER_HEIGHT + 20;
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    const footerTop = qrY + qrSize + 24;
    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PADDING, footerTop);
    ctx.lineTo(CARD_WIDTH - PADDING, footerTop);
    ctx.stroke();

    ctx.fillStyle = "#191c1d";
    ctx.font = 'bold 40px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("MENYU", CARD_WIDTH / 2, footerTop + 20 + FOOTER_HEIGHT / 2);

    const link = document.createElement("a");
    link.download = `fastqr-master-qr-${restaurantSlug}.png`;
    link.href = compositeCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="p-4 sm:p-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-[24px] sm:text-[32px] font-bold text-[#191c1d]">
          Ümumi QR Kod
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-[#1a1c1e] hover:bg-[#2c2e30] text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-200 min-h-[48px]"
          >
            <span className="material-symbols-outlined text-[20px]">print</span>
            <span>Çap Et</span>
          </button>
          <button
            type="button"
            onClick={downloadQR}
            className="bg-[#ab2e00] hover:bg-[#d63c00] text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-200 min-h-[48px]"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>PNG Yüklə</span>
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 text-[32px]">
              info
            </span>
            <div>
              <h3 className="text-[16px] font-bold text-blue-900 mb-1">
                Sadə Menyu Rejimi
              </h3>
              <p className="text-[13px] text-blue-700">
                Bu restoran VIEWER_ONLY (Sadə Menyu) rejimindədir. Müştərilər yalnız
                menyuya baxa, axtarış edə və kateqoriyalar arasında keçə bilərlər.
              </p>
            </div>
          </div>
        </div>

        <div className="print-area bg-white rounded-xl shadow-[0px_2px_12px_rgba(0,0,0,0.06)] border border-[#e1e3e4]/50 p-8 flex flex-col items-center gap-6">
          <div className="text-center">
            <h3 className="text-[24px] font-bold text-[#191c1d] mb-2">
              Ana Menyu QR Kodu
            </h3>
            <p className="text-[14px] text-[#6b6e72]">
              Bu QR kodu çap edin və restoranın girişində quraşdırın.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#e1e3e4]">
            <QRCodeCanvas
              id="master-qr-code"
              value={menuUrl}
              size={200}
              level="M"
              includeMargin
            />
          </div>

          <div className="w-full">
            <label className="block text-[12px] font-semibold text-[#5c4038] mb-2">
              Bağlantı
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={menuUrl}
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#e1e3e4] bg-gray-50 text-[13px] text-gray-600"
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(menuUrl)}
                className="px-4 py-2.5 rounded-lg bg-[#1a1c1e] text-white text-[12px] font-semibold hover:bg-[#2c2e30] transition-colors min-h-[44px]"
              >
                Köçür
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 15mm;
          }
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          header button, aside, .md\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
