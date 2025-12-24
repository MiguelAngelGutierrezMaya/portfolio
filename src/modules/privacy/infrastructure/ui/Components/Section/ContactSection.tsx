//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './ContactSection.css';

const ContactSection: React.FC = () => {
  return (
    <section className="contact-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
      <p className="text-base text-zinc-300 mb-2">
        If you have any questions, concerns, or requests regarding this Privacy Policy or how we
        handle your personal information, please contact us:
      </p>
      <p className="text-base text-zinc-300 mb-2">
        You can reach out through the contact form available on this website, or by using the
        contact information provided in the main portfolio section.
      </p>
      <p className="text-base text-zinc-300">
        We are committed to addressing your privacy concerns and will respond to your inquiries in a
        timely manner.
      </p>
    </section>
  );
};

export default ContactSection;
