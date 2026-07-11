import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/social";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-xs font-medium uppercase tracking-wider sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}
