//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './DataSecuritySection.css';

const DataSecuritySection: React.FC = () => {
  return (
    <section className="data-security-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
      <p className="text-base text-zinc-300 mb-2">
        We implement reasonable security measures to protect your personal information from
        unauthorized access, alteration, disclosure, or destruction. These measures include:
      </p>
      <ul className="list-disc list-inside text-base text-zinc-300 mb-2 space-y-2 ml-4">
        <li>Secure transmission of data using industry-standard encryption protocols</li>
        <li>Regular security assessments and updates to our systems</li>
        <li>Limited access to personal information on a need-to-know basis</li>
        <li>Use of reputable third-party service providers that follow security best practices</li>
      </ul>
      <p className="text-base text-zinc-300">
        While we strive to protect your personal information, no method of transmission over the
        internet or electronic storage is completely secure. We cannot guarantee absolute security,
        but we are committed to maintaining appropriate safeguards.
      </p>
    </section>
  );
};

export default DataSecuritySection;
