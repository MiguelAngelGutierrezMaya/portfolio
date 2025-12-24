//
// React components
//
import React from 'react';
import PolicyIntroduction from '@privacy/infrastructure/ui/Components/Section/PolicyIntroduction';
import PrimaryDataSection from '@privacy/infrastructure/ui/Components/Section/PrimaryDataSection';
import DataUsageSection from '@privacy/infrastructure/ui/Components/Section/DataUsageSection';
import DataSharingSection from '@privacy/infrastructure/ui/Components/Section/DataSharingSection';
import DataSecuritySection from '@privacy/infrastructure/ui/Components/Section/DataSecuritySection';
import UserRightsSection from '@privacy/infrastructure/ui/Components/Section/UserRightsSection';
import PolicyChangesSection from '@privacy/infrastructure/ui/Components/Section/PolicyChangesSection';
import ContactSection from '@privacy/infrastructure/ui/Components/Section/ContactSection';
import Header from '@privacy/infrastructure/ui/Components/Header/Header';

// Use type Record<never, never> instead of empty interface
type PrincipalProps = Record<never, never>;

const Principal: React.FC<PrincipalProps> = () => {
  return (
    <>
      <div className="bg-black fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full h-full max-w-7xl lg:px-8">
          <div className="w-full bg-zinc-900 ring-1 ring-zinc-100 ring-zinc-300/20 overflow-y-auto">
            <Header />
            <div className="px-4 py-8">
              <PolicyIntroduction />
              <PrimaryDataSection />
              <DataUsageSection />
              <DataSharingSection />
              <DataSecuritySection />
              <UserRightsSection />
              <PolicyChangesSection />
              <ContactSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Principal;
