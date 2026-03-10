import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
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
      const { data, error } = await supabase
        .from('reservations')
        .insert({
          guest_name: 'Maria',
          booking_code: '#011356739',
          selected_hotel: hotelInfo.name,
          room_type: hotelInfo.room,
          price: hotelInfo.price,
          optional_message: message.trim() || '',
          visit_date: '30 марта 2026',
        })
        .select('confirmation_number')
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        setSubmitError('Ошибка при отправке бронирования. Пожалуйста, попробуйте ещё раз.');
        return;
      }

      if (data && data.confirmation_number) {
        onSubmitSuccess(data.confirmation_number);
      } else {
        // Fallback — data inserted but no confirmation returned
        onSubmitSuccess('VIP-PENDING');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setSubmitError('Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.');
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
            {/* Optional message */}
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

            {/* Error message */}
            {submitError && (
              <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 animate-fade-in">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-red-400 text-sm font-poppins font-medium">
                      Ошибка отправки
                    </p>
                    <p className="text-red-400/70 text-xs font-poppins mt-1">
                      {submitError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-gold w-full py-4 text-base tracking-wider font-poppins uppercase flex items-center justify-center gap-3 ${
                isSubmitting ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="gold-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px', borderTopColor: '#0a0f1c' }} />
                  <span>Отправка...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Подтвердить Бронирование</span>
                </>
              )}
            </button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <svg className="w-4 h-4 text-[#c0c0c0]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[#c0c0c0]/30 text-xs font-poppins">
                Защищённое соединение — данные сохраняются в базу
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
