import React from 'react';
import GoldDivider from './GoldDivider';
import Particles from './Particles';

interface WelcomeSectionProps {
  onContinue: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onContinue }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-animated overflow-hidden">
      <Particles />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="glass-strong p-8 sm:p-14 text-center animate-fade-in">
          {/* Decorative top accent */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#d4af37]/60" />
              <svg className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#d4af37]/60" />
            </div>
          </div>

          {/* Header */}
          <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-[#d4af37] mb-2 tracking-wide gold-text-glow">
            Персональное Подтверждение
          </h2>

          <GoldDivider width="w-40" />

          {/* Welcome name */}
          <div className="my-8 animate-fade-in-up-delay-1">
            <p className="text-[#c0c0c0]/60 text-sm font-poppins mb-2 uppercase tracking-widest">
              Добро пожаловать
            </p>
            <h3 className="font-playfair text-4xl sm:text-5xl font-bold text-white gold-text-glow">
              Мария
            </h3>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-[#c0c0c0]/20 mx-auto my-6" />

          {/* Visit date */}
          <div className="animate-fade-in-up-delay-2">
            <p className="text-[#c0c0c0]/50 text-xs font-poppins uppercase tracking-widest mb-1">
              Дата визита
            </p>
            <p className="font-playfair text-xl sm:text-2xl text-white font-medium">
              30 марта 2026 г.
            </p>
          </div>

          <GoldDivider width="w-56" className="my-8" />

          {/* Instruction */}
          <div className="animate-fade-in-up-delay-3">
            <p className="text-[#c0c0c0]/70 text-sm sm:text-base font-poppins font-light leading-relaxed mb-2">
              Наша логистическая команда готова к вашему прибытию.
            </p>
            <p className="text-[#c0c0c0]/70 text-sm sm:text-base font-poppins font-light leading-relaxed">
              Пожалуйста, выберите предпочтительное размещение ниже.
            </p>
          </div>

          {/* Continue button */}
          <button
            onClick={onContinue}
            className="btn-gold mt-10 px-12 py-4 text-base tracking-wider font-poppins uppercase"
          >
            Продолжить
          </button>

          {/* Decorative bottom */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/30" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/50" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
