//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './DataUsageSection.css';

const DataUsageSection: React.FC = () => {
  return (
    <section className="data-usage-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
      <p className="text-base text-zinc-300 mb-2">
        The personal information collected through our contact form, chatbot interactions, or
        conversations during meetings is used exclusively for the following purposes:
      </p>
      <ul className="list-disc list-inside text-base text-zinc-300 mb-2 space-y-2 ml-4">
        <li>
          <strong className="text-zinc-200">Communication:</strong> To respond to your inquiries,
          messages, and requests for information about my professional services or collaboration
          opportunities.
        </li>
        <li>
          <strong className="text-zinc-200">Service Delivery:</strong> To facilitate discussions,
          schedule meetings, and provide information about my portfolio, skills, and professional
          experience.
        </li>
        <li>
          <strong className="text-zinc-200">Professional Relationship:</strong> To establish and
          maintain professional connections and potential business opportunities.
        </li>
      </ul>
      <p className="text-base text-zinc-300">
        We do not use your personal information for marketing purposes, automated decision-making,
        or profiling. Your data is handled with respect and used solely to provide the services you
        have requested.
      </p>
    </section>
  );
};

export default DataUsageSection;
