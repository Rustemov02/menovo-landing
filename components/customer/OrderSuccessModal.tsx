import type { Order } from "../../types";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderSuccessModal({
  isOpen,
  onClose,
  order,
}: OrderSuccessModalProps) {
  if (!isOpen || !order) return null;
  console.log("ORDER : " ,order)
  
  // const totalItems = order.items.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-surface rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center max-h-[90vh] overflow-y-auto">
        {/* Green Checkmark Icon */}
        <div className="w-20 h-20 rounded-full bg-tertiary-container flex items-center justify-center mb-4 flex-shrink-0">
          <span className="material-symbols-outlined text-[40px] text-on-tertiary-container">
            check
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-headline-md text-headline-md text-on-surface mb-1 flex-shrink-0">
          Sifarişiniz Qəbul Olundu!
        </h2>

        {/* Subtitle */}
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-shrink-0">
          Sifarişiniz mətbəxə ötürüldü və tezliklə hazırlanacaq.
        </p>

        {/* Order Info Header */}
        <div className="w-full flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-label-sm">
              {order.tableName || `Masa ${order.tableNumber}`}
            </span>
            <span className="text-label-sm text-on-surface-variant font-mono">
              #{order.id?.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Ordered Items List (scrollable) */}
        <div className="w-full bg-surface-container-low rounded-xl p-4 mb-4 max-h-48 overflow-y-auto flex-shrink-0">
          <div className="space-y-3">
            {order.items.map((ci) => (
              <div
                key={ci.item?.id}
                className="flex justify-between items-center text-left"
              >
                <span className="font-body-md text-body-md text-on-surface">
                  <span className="font-bold text-primary">{ci.quantity}x</span>{" "}
                  {ci.item?.name}
                </span>
                <span className="font-bold text-on-surface text-sm flex-shrink-0 ml-4">
                  {(ci.item?.price * ci.quantity).toFixed(2)} AZN
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Breakdown */}
        <div className="w-full mb-6 flex-shrink-0">
          {/* Subtotal */}
          <div className="flex justify-between items-center py-1">
            <span className="font-body-md text-body-md text-on-surface-variant">
              Ara cəmi
            </span>
            <span className="font-body-md text-body-md text-on-surface">
              {order.totalPrice.toFixed(2)} AZN
            </span>
          </div>
          {/* Divider */}
          <div className="border-t border-surface-variant my-2"></div>
          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="font-headline-md text-headline-md text-on-surface">
              Cəmi
            </span>
            <span className="font-headline-md text-headline-md text-primary">
              {order.totalPrice.toFixed(2)} AZN
            </span>
          </div>
        </div>

        {/* Status Notification Banner */}
        <div className="w-full bg-surface-container-highest rounded-xl p-4 mb-6 flex items-start gap-3 text-left flex-shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0 mt-0.5">
            info
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Sifarişiniz gözləmədədir. Mətbəx təsdiqləyənə qədər ləğv etmək
            üçün ofisianta müraciət edə bilərsiniz.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-body-lg shadow-lg active:scale-[0.98] transition-transform flex-shrink-0"
        >
          Menyuya Qayıt
        </button>
      </div>
    </div>
  );
}