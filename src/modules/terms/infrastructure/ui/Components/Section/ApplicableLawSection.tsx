//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './ApplicableLawSection.css';

const ApplicableLawSection: React.FC = () => {
  return (
    <section className="applicable-law-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">8. Applicable Law</h2>
      <p className="text-base text-zinc-300 mb-2">
        These Terms of Service shall be governed by and construed in accordance with the laws of the
        jurisdiction in which the website owner operates, without regard to its conflict of law
        provisions.
      </p>
      <p className="text-base text-zinc-300">
        Any disputes arising out of or relating to these Terms of Service or the website shall be
        subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
      </p>
    </section>
  );
};

export default ApplicableLawSection;
