import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/utils/site";

export default function CTA() {
  return (
    <div className="flex flex-col items-center text-center gap-md mb-xl">
      <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
        Restoranınızı bu gün rəqəmsallaşdırın.
      </h2>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#10B981] hover:bg-[#059669] text-white px-xl py-lg rounded-xl font-title-md text-title-md font-bold transition-all flex items-center justify-center gap-sm shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:-translate-y-1 mt-sm"
      >
        <MessageCircle size={24} className="fill-current" />
        WhatsApp-da Bizə Yazın
      </a>
    </div>
  );
}
