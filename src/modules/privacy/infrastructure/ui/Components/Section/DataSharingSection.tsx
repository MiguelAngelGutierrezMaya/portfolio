//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './DataSharingSection.css';

const DataSharingSection: React.FC = () => {
  return (
    <section className="data-sharing-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
      <p className="text-base text-zinc-300 mb-2">
        Your personal information is not sold, rented, or traded to third parties. We only share
        your information in the following limited circumstances:
      </p>
      <ul className="list-disc list-inside text-base text-zinc-300 mb-2 space-y-2 ml-4">
        <li>
          <strong className="text-zinc-200">Email Service Provider:</strong> When you submit the
          contact form, your information (name, email, and message) is processed through a trusted
          email service provider to deliver your message. This provider is bound by confidentiality
          obligations.
        </li>
        <li>
          <strong className="text-zinc-200">Legal Requirements:</strong> We may disclose your
          information if required by law, court order, or governmental regulation, or to protect our
          rights and safety.
        </li>
      </ul>
      <p className="text-base text-zinc-300">
        Except for these specific situations, your personal data remains private and is not shared
        with other parties.
      </p>
    </section>
  );
};

export default DataSharingSection;
