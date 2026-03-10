import React from 'react';

import GoldDivider from './GoldDivider';
import Particles from './Particles';

const FOUR_SEASONS_IMG = 'https://d64gsuwffb70l.cloudfront.net/69afb189f0957f25fa9c30ad_1773122007329_5293421c.jpg';
const CARLTON_IMG = 'https://d64gsuwffb70l.cloudfront.net/69afb189f0957f25fa9c30ad_1773122029420_0a5df268.png';

interface Hotel {
  id: string;
  name: string;
  room: string;
  price: string;
  priceNum: string;
  image: string;
  features: string[];
}

const hotels: Hotel[] = [
  {
    id: 'four-seasons',
    name: 'FOUR SEASONS HOTEL MOSCOW',
    room: 'Premier King Room',
    price: '80 000 ₽',
    priceNum: '80,000',
    image: FOUR_SEASONS_IMG,
    features: ['Вид на Кремль', 'Мраморная ванная', 'Круглосуточный консьерж', 'Спа-доступ'],
  },
  {
    id: 'carlton',
    name: 'THE CARLTON MOSCOW',
    room: 'Executive Suite',
    price: '88 800 ₽',
    priceNum: '88,800',
    image: CARLTON_IMG,
    features: ['Панорамный вид', 'Гостиная зона', 'Персональный батлер', 'Лимузин-трансфер'],
  },
];

interface AccommodationSectionProps {
  selectedHotel: string | null;
  onSelectHotel: (hotelId: string, hotelName: string) => void;
  onProceed: () => void;
}

const AccommodationSection: React.FC<AccommodationSectionProps> = ({
  selectedHotel,
  onSelectHotel,
  onProceed,
}) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-animated overflow-hidden py-16 sm:py-20">
      <Particles />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-[#d4af37]/60 text-xs font-poppins uppercase tracking-[0.3em] mb-3">
            Шаг 2 из 3
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-2 tracking-wide">
            Выберите Размещение
          </h2>
          <GoldDivider width="w-48" />
          <p className="text-[#c0c0c0]/60 text-sm font-poppins font-light mt-4">
            Выберите предпочтительный вариант проживания
          </p>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {hotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className={`hotel-card glass cursor-pointer ${
                selectedHotel === hotel.id ? 'selected' : ''
              } ${index === 0 ? 'animate-fade-in-up-delay-1' : 'animate-fade-in-up-delay-2'}`}
              onClick={() => onSelectHotel(hotel.id, hotel.name)}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="hotel-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

                {/* Selected badge */}
                {selectedHotel === hotel.id && (
                  <div className="absolute top-4 right-4 bg-[#d4af37] text-[#0a0f1c] px-3 py-1 rounded-full text-xs font-poppins font-semibold uppercase tracking-wider animate-scale-pop flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Выбрано
                  </div>
                )}

                {/* Price tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-[#d4af37] font-playfair text-2xl font-bold gold-text-glow">
                    {hotel.price}
                  </span>
                  <span className="text-[#c0c0c0]/50 text-xs font-poppins ml-1">/ ночь</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Hotel name */}
                <h3 className="font-playfair text-lg sm:text-xl font-semibold text-white mb-1 tracking-wide">
                  {hotel.name}
                </h3>
                <p className="text-[#d4af37]/70 text-sm font-poppins font-light mb-4">
                  {hotel.room}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {hotel.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/50 flex-shrink-0" />
                      <span className="text-[#c0c0c0]/60 text-xs font-poppins">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Select button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHotel(hotel.id, hotel.name);
                  }}
                  className={`w-full py-3 rounded-xl text-sm font-poppins font-semibold uppercase tracking-wider transition-all duration-400 ${
                    selectedHotel === hotel.id
                      ? 'btn-gold animate-pulse-glow'
                      : 'border border-[#c0c0c0]/20 text-[#c0c0c0] hover:border-[#d4af37]/50 hover:text-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  }`}
                >
                  {selectedHotel === hotel.id ? 'Выбрано' : 'Выбрать'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Proceed button */}
        {selectedHotel && (
          <div className="text-center mt-10 animate-fade-in-up">
            <button
              onClick={onProceed}
              className="btn-gold px-16 py-4 text-base tracking-wider font-poppins uppercase"
            >
              Продолжить к бронированию
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AccommodationSection;
