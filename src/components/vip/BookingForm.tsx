import React, { useState } from 'react';
import GoldDivider from './GoldDivider';
import Particles from './Particles';

interface BookingFormProps {
  selectedHotelName: string;
  onSubmitSuccess: (confirmationNumber: string) => void;
}

const HOTEL_DISPLAY: Record<string, { name: string; room: string; price: string }> = {
  'FOUR SEASONS HOTEL MOSCOW': {
    name: 'Four Seasons Hotel Moscow',
    room: 'Premier King Room',
    price: '80 000 ₽',
  },
  'THE CARLTON MOSCOW': {
    name: 'The Carlton Moscow',
    room: 'Executive Suite',
    price: '88 800 ₽',
  },
};

const BookingForm: React.FC<BookingFormProps> = ({ selectedHotelName, onSubmitSuccess }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hotelInfo = HOTEL_DISPLAY[selectedHotelName] || {
    name: selectedHotelName,
    room: '',
    price: '',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://formspree.io/f/mreypbao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          guest_name: "Maria",
          booking_code: "#011356739",
          hotel: hotelInfo.name,
          room_type: hotelInfo.room,
          price: hotelInfo.price,
          visit_date: "30 марта 2026",
          message: message.trim() || ""
        })
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const confirmation = "VIP-" + Math.floor(100000 + Math.random() * 900000);
      onSubmitSuccess(confirmation);

    } catch (err) {
      console.error(err);
      setSubmitError('Ошибка при отправке бронирования. Пожалуйста, попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-animated overflow-hidden py-16 sm:py-20">
      <Particles />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="glass-strong p-8 sm:p-12 animate-fade-in">

          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-[#d4af37]/60 text-xs font-poppins uppercase tracking-[0.3em] mb-3">
              Шаг 3 из 3
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white tracking-wide">
              Завершение Бронирования
            </h2>
            <GoldDivider width="w-40" />
          </div>

          {/* Booking Summary */}
          <div className="glass p-6 mb-8 animate-fade-in-up-delay-1">
            <h3 className="text-[#d4af37]/80 text-xs font-poppins uppercase tracking-widest mb-4">
              Детали бронирования
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between items-center">
                <span className="text-[#c0c0c0]/50 text-sm font-poppins">Гость</span>
                <span className="text-white font-poppins font-medium">Мария</span>
              </div>

              <div className="w-full h-px bg-[#c0c0c0]/10" />

              <div className="flex justify-between items-center">
                <span className="text-[#c0c0c0]/50 text-sm font-poppins">Код бронирования</span>
                <span className="text-[#d4af37] font-mono text-sm">#011356739</span>
              </div>

              <div className="w-full h-px bg-[#c0c0c0]/10" />

              <div className="flex justify-between items-center">
                <span className="text-[#c0c0c0]/50 text-sm font-poppins">Дата визита</span>
                <span className="text-white font-poppins font-medium">30 марта 2026</span>
              </div>

              <div className="w-full h-px bg-[#c0c0c0]/10" />

              <div className="flex justify-between items-center">
                <span className="text-[#c0c0c0]/50 text-sm font-poppins">Отель</span>
                <span className="text-white font-poppins font-medium text-right text-sm">
                  {hotelInfo.name}
                </span>
              </div>

              <div className="w-full h-px bg-[#c0c0c0]/10" />

              <div className="flex justify-between items-center">
                <span className="text-[#c0c0c0]/50 text-sm font-poppins">Номер</span>
                <span className="text-white font-poppins font-medium">{hotelInfo.room}</span>
              </div>

              <div className="w-full h-px bg-[#c0c0c0]/10" />

              <div className="flex justify-between items-center">
                <span className="text-[#c0c0c0]/50 text-sm font-poppins">Стоимость</span>
                <span className="text-[#d4af37] font-playfair text-lg font-bold gold-text-glow">
                  {hotelInfo.price}
                </span>
              </div>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="animate-fade-in-up-delay-2">

            <div className="mb-6">
              <label className="block text-[#c0c0c0]/50 text-xs font-poppins uppercase tracking-widest mb-3">
                Сообщение для менеджмента (необязательно)
              </label>

              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (submitError) setSubmitError(null);
                }}
                placeholder="Особые пожелания, предпочтения, требования..."
                className="textarea-luxury w-full px-5 py-4 text-sm font-poppins"
                rows={4}
              />
            </div>

            {submitError && (
              <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
                <p className="text-red-400 text-sm font-poppins">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-gold w-full py-4 text-base tracking-wider font-poppins uppercase flex items-center justify-center gap-3 ${
                isSubmitting ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="gold-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                  <span>Отправка...</span>
                </>
              ) : (
                <>
                  <span>Подтвердить Бронирование</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="text-[#c0c0c0]/30 text-xs font-poppins">
                Защищённое соединение — запрос отправляется менеджеру
              </span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
