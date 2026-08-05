import type { MenuItem } from "../../types";

interface DishDetailModalProps {
  dish: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  isViewerOnly?: boolean;
  onAddToCart?: (dish: MenuItem) => void;
}

export default function DishDetailModal({
  dish,
  isOpen,
  onClose,
  isViewerOnly = false,
  onAddToCart,
}: DishDetailModalProps) {
  if (!isOpen || !dish) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-surface w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="relative">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-48 sm:h-56 object-cover sm:rounded-t-2xl"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center"
            aria-label="Bağla"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-primary-container text-on-primary-container">
              {dish.category}
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-2">
              {dish.name}
            </h2>
            <p className="text-primary font-bold text-[20px] mt-1">
              {dish.price.toFixed(2)} AZN
            </p>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold text-on-surface-variant uppercase tracking-wide mb-1">
              Təsvir
            </h3>
            <p className="text-body-md text-on-surface">{dish.description}</p>
          </div>

          {!isViewerOnly && onAddToCart && (
            <button
              type="button"
              onClick={() => {
                onAddToCart(dish);
                onClose();
              }}
              className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-body-lg shadow-lg active:scale-[0.98] transition-transform min-h-[52px] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add_shopping_cart</span>
              Səbətə Əlavə Et
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
