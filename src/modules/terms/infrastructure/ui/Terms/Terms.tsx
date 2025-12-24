//
// React components
//
import React from 'react';
import TermsIntroduction from '@terms/infrastructure/ui/Components/Section/TermsIntroduction';
import AcceptanceSection from '@terms/infrastructure/ui/Components/Section/AcceptanceSection';
import ServiceDescriptionSection from '@terms/infrastructure/ui/Components/Section/ServiceDescriptionSection';
import UseOfServicesSection from '@terms/infrastructure/ui/Components/Section/UseOfServicesSection';
import UserContentSection from '@terms/infrastructure/ui/Components/Section/UserContentSection';
import LiabilityLimitationSection from '@terms/infrastructure/ui/Components/Section/LiabilityLimitationSection';
import TermsModificationsSection from '@terms/infrastructure/ui/Components/Section/TermsModificationsSection';
import TerminationSection from '@terms/infrastructure/ui/Components/Section/TerminationSection';
import ApplicableLawSection from '@terms/infrastructure/ui/Components/Section/ApplicableLawSection';
import TermsContactSection from '@terms/infrastructure/ui/Components/Section/TermsContactSection';
import Header from '@terms/infrastructure/ui/Components/Header/Header';

// Use type Record<never, never> instead of empty interface
type TermsProps = Record<never, never>;

const Terms: React.FC<TermsProps> = () => {
  return (
    <>
      <div className="bg-black fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full h-full max-w-7xl lg:px-8">
          <div className="w-full bg-zinc-900 ring-1 ring-zinc-100 ring-zinc-300/20 overflow-y-auto">
            <Header />
            <div className="px-4 py-8">
              <TermsIntroduction />
              <AcceptanceSection />
              <ServiceDescriptionSection />
              <UseOfServicesSection />
              <UserContentSection />
              <LiabilityLimitationSection />
              <TermsModificationsSection />
              <TerminationSection />
              <ApplicableLawSection />
              <TermsContactSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
