//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './PrimaryDataSection.css';

const PrimaryDataSection: React.FC = () => {
  return (
    <section className="primary-data-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">Collection of Primary Data</h2>
      <p className="text-base text-zinc-300 mb-2">
        In the course of using our services, you may be asked to provide certain personal
        information, including your full name, email address, and phone number. This information may
        be collected through chatbot interactions or during conversations in meetings.
      </p>
      <p className="text-base text-zinc-300 mb-2">
        The primary purpose of collecting this data is to facilitate effective communication,
        respond to your inquiries, and provide a personalized experience. We are committed to
        handling your information responsibly and in accordance with applicable data protection
        laws.
      </p>
      <p className="text-base text-zinc-300">
        Your personal data will not be shared with third parties without your explicit consent,
        except where required by law. If you have any questions or concerns regarding the use of
        your information, please contact us using the details provided on this website.
      </p>
    </section>
  );
};

export default PrimaryDataSection;
