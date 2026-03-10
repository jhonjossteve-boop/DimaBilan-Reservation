import React from 'react';
import GoldDivider from './GoldDivider';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmationNumber: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, confirmationNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
      {/* Modal Content */}
      <div className="glass-modal p-8 sm:p-12 max-w-lg w-full text-center animate-scale-pop gold-glow-strong">
        {/* Success Icon */}
        <div className="mb-6">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#d4af37]/50 animate-pulse-glow"
            style={{ background: 'rgba(212,175,55,0.1)' }}
          >
            <svg className="w-10 h-10 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wide">
          Бронирование Подтверждено
        </h2>

        <GoldDivider width="w-32" />

        {/* Message */}
        <p className="text-[#c0c0c0]/80 text-sm sm:text-base font-poppins font-light leading-relaxed mb-2 mt-6">
          Бронирование успешно отправлено.
        </p>
        <p className="text-[#c0c0c0]/60 text-sm font-poppins font-light leading-relaxed mb-8">
          Команда менеджмента свяжется с вами в ближайшее время с финальными ссылками и деталями.
        </p>

        {/* Booking reference — real confirmation number from database */}
        <div className="glass p-5 mb-8 inline-block">
          <p className="text-[#c0c0c0]/40 text-xs font-poppins uppercase tracking-widest mb-2">
            Номер подтверждения
          </p>
          <p className="text-[#d4af37] font-mono text-xl sm:text-2xl tracking-wider gold-text-glow font-bold">
            {confirmationNumber}
          </p>
          <p className="text-[#c0c0c0]/30 text-[10px] font-poppins mt-2 uppercase tracking-wider">
            Сохраните этот номер для справки
          </p>
        </div>

        {/* Database confirmation badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400/70 text-xs font-poppins">
            Данные сохранены в базу данных
          </span>
        </div>

        {/* Decorative stars */}
        <div className="flex justify-center gap-3 mb-8">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-[#d4af37]/40"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="btn-gold px-12 py-3.5 text-sm tracking-wider font-poppins uppercase"
        >
          Закрыть
        </button>

        {/* Footer */}
        <p className="text-[#c0c0c0]/20 text-xs mt-6 font-poppins">
          D.B. Exclusive Reservations
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
