//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './UserRightsSection.css';

const UserRightsSection: React.FC = () => {
  return (
    <section className="user-rights-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
      <p className="text-base text-zinc-300 mb-2">
        You have certain rights regarding your personal information. You may:
      </p>
      <ul className="list-disc list-inside text-base text-zinc-300 mb-2 space-y-2 ml-4">
        <li>
          <strong className="text-zinc-200">Access:</strong> Request information about the personal
          data we hold about you
        </li>
        <li>
          <strong className="text-zinc-200">Correction:</strong> Request correction of inaccurate or
          incomplete personal information
        </li>
        <li>
          <strong className="text-zinc-200">Deletion:</strong> Request deletion of your personal
          information, subject to legal or legitimate business retention requirements
        </li>
        <li>
          <strong className="text-zinc-200">Objection:</strong> Object to certain uses of your
          personal information
        </li>
        <li>
          <strong className="text-zinc-200">Data Portability:</strong> Request a copy of your
          personal data in a structured, machine-readable format
        </li>
      </ul>
      <p className="text-base text-zinc-300">
        To exercise any of these rights, please contact us using the contact information provided on
        this website. We will respond to your request within a reasonable timeframe and in
        accordance with applicable data protection laws.
      </p>
    </section>
  );
};

export default UserRightsSection;
