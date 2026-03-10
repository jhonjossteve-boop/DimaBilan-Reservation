import React, { useState, useCallback, useRef } from 'react';
import HeroSection from './vip/HeroSection';
import WelcomeSection from './vip/WelcomeSection';
import AccommodationSection from './vip/AccommodationSection';
import BookingForm from './vip/BookingForm';
import SuccessModal from './vip/SuccessModal';

type Stage = 'access' | 'welcome' | 'accommodation' | 'booking' | 'complete';

const AppLayout: React.FC = () => {
  const [stage, setStage] = useState<Stage>('access');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedHotelName, setSelectedHotelName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);

  // Smooth transition between stages
  const transitionTo = useCallback((newStage: Stage) => {
    setFadeIn(false);
    setTimeout(() => {
      setStage(newStage);
      setFadeIn(true);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  }, []);

  const handleUnlock = useCallback(() => {
    transitionTo('welcome');
  }, [transitionTo]);

  const handleContinueToAccommodation = useCallback(() => {
    transitionTo('accommodation');
  }, [transitionTo]);

  const handleSelectHotel = useCallback((hotelId: string, hotelName: string) => {
    setSelectedHotel(hotelId);
    setSelectedHotelName(hotelName);
  }, []);

  const handleProceedToBooking = useCallback(() => {
    transitionTo('booking');
  }, [transitionTo]);

  const handleSubmitSuccess = useCallback((confNumber: string) => {
    setConfirmationNumber(confNumber);
    setShowSuccess(true);
  }, []);

  const handleCloseSuccess = useCallback(() => {
    setShowSuccess(false);
    setConfirmationNumber('');
    transitionTo('access');
    // Reset all state
    setSelectedHotel(null);
    setSelectedHotelName('');
    setIsUnlocking(false);
  }, [transitionTo]);

  return (
    <div className="min-h-screen bg-[#0a0f1c] relative">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #d4af37, transparent)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #d4af37, transparent)' }}
        />
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className={`relative z-10 transition-opacity duration-500 ease-in-out ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {stage === 'access' && (
          <HeroSection
            onUnlock={handleUnlock}
            isUnlocking={isUnlocking}
            setIsUnlocking={setIsUnlocking}
          />
        )}

        {stage === 'welcome' && (
          <WelcomeSection onContinue={handleContinueToAccommodation} />
        )}

        {stage === 'accommodation' && (
          <AccommodationSection
            selectedHotel={selectedHotel}
            onSelectHotel={handleSelectHotel}
            onProceed={handleProceedToBooking}
          />
        )}

        {stage === 'booking' && (
          <BookingForm
            selectedHotelName={selectedHotelName}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        confirmationNumber={confirmationNumber}
      />

      {/* Footer watermark */}
      <div className="fixed bottom-4 left-0 right-0 text-center z-20 pointer-events-none">
        <p className="text-[#c0c0c0]/15 text-[10px] font-poppins tracking-[0.2em] uppercase">
          D.B. Management — Конфиденциальный Портал
        </p>
      </div>
    </div>
  );
};

export default AppLayout;
