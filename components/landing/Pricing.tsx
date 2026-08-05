const plans = [
  {
    name: "Başlanğıc",
    price: "29",
    period: "/ay",
    description: "Kiçik restoranlar və kafelər üçün",
    features: ["3 Masa", "100 Menu Məhsulu", "Temiz Analitika", "E-poçt Dəstəyi"],
    cta: "Pulsuz Başla",
    href: "https://admin.menovo.rest/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "79",
    period: "/ay",
    description: "Orta və böyük restoranlar üçün",
    features: ["10 Masa", "1000 Menu Məhsulu", "Detallı Hesabatlar", "Öncelikli Dəstək", "Brendləşdirmə"],
    cta: "İndi Başla",
    href: "https://admin.menovo.rest/register",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "199",
    period: "/ay",
    description: "Zəncirlər və böyük obyektlər üçün",
    features: ["Limitsiz Masa", "Limitsiz Məhsul", "API Girişi", "24/7 Dəstək", "Özəl Təlimat"],
    cta: "Əlaqə Saxla",
    href: "https://admin.menovo.rest/register",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Sadə və şəffaf qiymətlər
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Biznesinizin ölçüsünə uyğun plan seçin. Hər zaman dəyişdirmək mümkündür.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl p-8 shadow-sm ring-1 ${
                plan.featured
                  ? "bg-black text-white ring-black"
                  : "bg-white text-gray-900 ring-gray-200"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-sm font-semibold text-black">
                    Ən Populyar
                  </span>
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className={`mt-2 text-sm ${plan.featured ? "text-gray-300" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}₼</span>
                <span className={`text-sm ${plan.featured ? "text-gray-300" : "text-gray-500"}`}>{plan.period}</span>
              </div>
              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className={`h-5 w-5 flex-shrink-0 ${plan.featured ? "text-white" : "text-black"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.featured ? "text-gray-200" : "text-gray-600"}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                  plan.featured
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}