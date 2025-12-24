//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './TermsContactSection.css';

const TermsContactSection: React.FC = () => {
  return (
    <section className="terms-contact-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">9. Contact</h2>
      <p className="text-base text-zinc-300 mb-2">
        If you have any questions or concerns about these Terms of Service, please contact us using
        the contact form available on this website or through the contact information provided in
        the main portfolio section.
      </p>
      <p className="text-base text-zinc-300">
        We are committed to addressing your inquiries and will respond to your questions in a timely
        manner.
      </p>
    </section>
  );
};

export default TermsContactSection;
