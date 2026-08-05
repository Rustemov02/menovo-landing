import { useState, useEffect } from "react";
import type { MenuItem } from "../../types";
import toast from "react-hot-toast";
import { compressImage } from "../../utils/imageCompressor";

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MenuItem>) => Promise<void>;
  item?: MenuItem | null;
  loading?: boolean;
  categories?: string[];
}

const defaultForm = {
  name: "",
  description: "",
  price: 0,
  category: "",
  image: "",
  isAvailable: true,
};

export default function MenuItemModal({
  isOpen,
  onClose,
  onSave,
  item,
  loading,
  categories = [],
}: MenuItemModalProps) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    category?: string;
    image?: string;
  }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        isAvailable: item.isAvailable,
      });
      setImagePreview(item.image || null);
    } else {
      setForm({
        ...defaultForm,
        category: categories[0] || "",
      });
      setImagePreview(null);
    }
    setErrors({});
  }, [item, isOpen, categories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === "price") {
      setForm((prev) => ({ ...prev, price: parseFloat(value) || 0 }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      price?: string;
      category?: string;
      image?: string;
    } = {};

    if (!form.name.trim()) {
      newErrors.name = "Məhsul adı doldurulmalıdır";
    }

    if (form.price <= 0 || isNaN(form.price)) {
      newErrors.price = "Qiymət 0-dan böyük olmalıdır";
    }

    if (!form.category) {
      newErrors.category = "Kateqoriya seçilməlidir";
    }

    if (!form.image.trim()) {
      newErrors.image = "Şəkil URL daxil edilməlidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) {
      return;
    }

    try {
      await onSave(form);
      toast.success(
        item ? "Məhsul uğurla yeniləndi!" : "Məhsul uğurla əlavə edildi!"
      );
      onClose();
    } catch (err: any) {
      toast.error(
        err?.message || "Əməliyyat zamanı xəta baş verdi. Yenidən cəhd edin."
      );
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Zəhmət olmasa, təsvir faylı seçin.");
      return;
    }

    try {
      const compressedDataUrl = await compressImage(file, 800, 800, 0.7);
      setImagePreview(compressedDataUrl);
      setForm((prev) => ({ ...prev, image: compressedDataUrl }));
      setErrors((prev) => ({ ...prev, image: undefined }));
      toast.success("Şəkil sığışdırıldı və yükləndi");
    } catch (err: any) {
      toast.error(err?.message || "Şəkil yüklənərkən xəta baş verdi");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-[#191c1d]">
            {item ? "Məhsulu redaktə et" : "Yeni məhsul əlavə et"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 min-w-[44px] min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[#454749]">
              close
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
              Məhsul adı *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="məs: Margarita Pizza"
              className={`w-full px-4 py-2.5 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] ${
                errors.name ? "border-red-400" : "border-[#e1e3e4]"
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-[12px] mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
              Təsvir
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Məhsulu təsvir edin..."
              className="w-full px-4 py-2.5 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] resize-none border-[#e1e3e4]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
                Qiymət (AZN) *
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-4 py-2.5 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] ${
                  errors.price ? "border-red-400" : "border-[#e1e3e4]"
                }`}
              />
              {errors.price && (
                <p className="text-red-600 text-[12px] mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
                Kateqoriya *
              </label>
              {categories.length === 0 ? (
                <p className="text-[13px] text-red-600 py-2">
                  Əvvəlcə Kateqoriyalar bölməsindən kateqoriya yaradın.
                </p>
              ) : (
                <>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] ${
                      errors.category ? "border-red-400" : "border-[#e1e3e4]"
                    }`}
                  >
                    <option value="">Kateqoriya seçin</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-600 text-[12px] mt-1">{errors.category}</p>
                  )}
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#5c4038] mb-1.5">
              Şəkil *
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-[#e1e3e4] text-[13px] font-medium text-[#5c4038] bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  upload_file
                </span>
                <span>
                  {imagePreview
                    ? "Şəkili dəyişdirmək üçün klikləyərək fayl seçin"
                    : "Fayl seçərək şəkil yüklə"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="və ya şəkil URL-i daxil edin"
                className={`w-full px-4 py-2.5 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ab2e00]/20 focus:border-[#ab2e00] ${
                  errors.image ? "border-red-400" : "border-[#e1e3e4]"
                }`}
              />
            </div>
            {errors.image && (
              <p className="text-red-600 text-[12px] mt-1">{errors.image}</p>
            )}
            {(imagePreview || form.image) && !errors.image && (
              <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border">
                <img
                  src={imagePreview || form.image}
                  alt="Önizləmə"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-[14px] font-semibold text-[#191c1d]">Mövcuddur</p>
              <p className="text-[12px] text-[#5c4038]">
                Müştərilər bu məhsulu sifariş edə bilər
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#e1e3e4] rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ab2e00]" />
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#e1e3e4] text-[#5c4038] font-semibold text-[14px] min-h-[48px]"
            >
              Ləğv et
            </button>
            <button
              type="submit"
              disabled={loading || categories.length === 0 || !form.category}
              className="flex-1 py-3 rounded-xl bg-[#ab2e00] text-white font-semibold text-[14px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Yüklənir...
                </>
              ) : item ? (
                "Dəyişiklikləri saxla"
              ) : (
                "Məhsul əlavə et"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}