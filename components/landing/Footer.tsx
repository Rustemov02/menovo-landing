import CTA from "./CTA";
import { LOGO_URL } from "@/utils/site";

const footerLinks = [
  { href: "#", label: "Xidmət Şərtləri" },
  { href: "#", label: "Məxfilik Siyasəti" },
  { href: "#", label: "Bizimlə Əlaqə" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest w-full py-xl border-t border-outline-variant/10 mt-xl">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* CTA */}
        <CTA />

        <div className="flex flex-col md:flex-row justify-between items-center gap-md pt-lg border-t border-outline-variant/10">
          <div className="flex items-center gap-sm">
            <img
              alt="Menovo Logo Small"
              className="w-8 h-8 object-contain rounded bg-surface-container-low p-1 border border-outline-variant/20"
              src={LOGO_URL}
            />
            <span className="font-body-md text-on-surface-variant">
              © 2026 Menovo. Bütün hüquqlar qorunur.
            </span>
          </div>
          <div className="flex gap-lg">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-on-surface-variant hover:text-secondary transition-colors font-body-md text-body-md transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
