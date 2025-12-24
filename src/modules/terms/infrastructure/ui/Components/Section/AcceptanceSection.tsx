//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './AcceptanceSection.css';

const AcceptanceSection: React.FC = () => {
  return (
    <section className="acceptance-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
      <p className="text-base text-zinc-300 mb-2">
        By accessing or using this portfolio website, you accept and agree to be bound by these
        Terms of Service and our Privacy Policy. If you do not agree with any part of these terms,
        you should not use this website.
      </p>
      <p className="text-base text-zinc-300">
        Your continued use of this website after any changes to these terms constitutes acceptance
        of those changes.
      </p>
    </section>
  );
};

export default AcceptanceSection;
