//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './TerminationSection.css';

const TerminationSection: React.FC = () => {
  return (
    <section className="termination-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">7. Termination</h2>
      <p className="text-base text-zinc-300 mb-2">
        We may suspend or terminate your access to this website at any time, with or without cause
        or notice, for any reason, including but not limited to breach of these Terms of Service.
      </p>
      <p className="text-base text-zinc-300">
        Upon termination, your right to use the website will immediately cease. All provisions of
        these Terms of Service that by their nature should survive termination shall survive,
        including ownership provisions, warranty disclaimers, and limitations of liability.
      </p>
    </section>
  );
};

export default TerminationSection;
