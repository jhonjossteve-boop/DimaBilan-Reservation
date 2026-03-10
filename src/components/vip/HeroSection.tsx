import React, { useState, useCallback } from 'react';
import GoldDivider from './GoldDivider';
import Particles from './Particles';

const CORRECT_CODE = '#011356739';

const MOSCOW_BG = 'https://d64gsuwffb70l.cloudfront.net/69afb189f0957f25fa9c30ad_1773122045600_05bb946a.png';

interface HeroSectionProps {
  onUnlock: () => void;
  isUnlocking: boolean;
  setIsUnlocking: (v: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onUnlock, isUnlocking, setIsUnlocking }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setShaking(false);

    if (code.trim() === CORRECT_CODE) {
      setSuccess(true);
      setTimeout(() => {
        setIsUnlocking(true);
        setTimeout(() => {
          onUnlock();
        }, 900);
      }, 800);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  }, [code, onUnlock, setIsUnlocking]);

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isUnlocking ? 'animate-unlock' : ''
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={MOSCOW_BG}
          alt="Moscow skyline"
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'blur(3px) brightness(0.35)' }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(180deg, rgba(10,15,28,0.7) 0%, rgba(10,15,28,0.85) 50%, rgba(10,15,28,0.95) 100%)'
      }} />

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        <div className={`glass-strong p-8 sm:p-12 text-center ${success ? 'gold-glow-strong' : ''}`}>
          {/* Logo / Monogram */}
          <div className="mb-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#d4af37]/40 mb-4"
              style={{ background: 'rgba(212,175,55,0.08)' }}>
              <span className="font-playfair text-3xl font-bold text-[#d4af37] gold-text-glow">
                Дима Билан
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-2 animate-fade-in-up tracking-wide">
            Дима Билан Exclusive Reservations
          </h1>

          <GoldDivider width="w-32" className="animate-fade-in-up-delay-1" />

          {/* Subtitle */}
          <p className="text-[#c0c0c0]/80 text-sm sm:text-base mb-2 animate-fade-in-up-delay-1 font-poppins font-light">
            Доступ ограничен.
          </p>
          <p className="text-[#c0c0c0]/60 text-sm mb-8 animate-fade-in-up-delay-2 font-poppins font-light">
            Пожалуйста, введите ваш конфиденциальный код бронирования.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="animate-fade-in-up-delay-3">
            <div className={`relative ${shaking ? 'animate-shake' : ''}`}>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                placeholder="Код бронирования #"
                className={`input-luxury w-full px-5 py-4 text-center text-lg tracking-widest font-poppins ${
                  success ? 'input-success' : error ? 'input-error' : ''
                }`}
                autoFocus
              />

              {/* Success indicator */}
              {success && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-400 text-sm mt-3 animate-fade-in font-poppins">
                Неверный код бронирования.
              </p>
            )}

            {/* Submit button */}
            {!success && (
              <button
                type="submit"
                className="btn-gold w-full mt-6 py-4 text-base tracking-wider font-poppins uppercase"
              >
                Войти
              </button>
            )}

            {success && (
              <div className="mt-6 flex items-center justify-center gap-3 text-[#d4af37]">
                <div className="gold-spinner" />
                <span className="text-sm font-poppins animate-pulse">Разблокировка портала...</span>
              </div>
            )}
          </form>

          {/* Footer note */}
          <p className="text-[#c0c0c0]/30 text-xs mt-8 font-poppins animate-fade-in-up-delay-3">
            Конфиденциальный портал управления артистом
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
