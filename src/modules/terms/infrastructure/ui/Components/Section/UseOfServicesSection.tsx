//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './UseOfServicesSection.css';

const UseOfServicesSection: React.FC = () => {
  return (
    <section className="use-of-services-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">3. Use of Services</h2>
      <p className="text-base text-zinc-300 mb-2">
        <strong className="text-zinc-200">Eligibility:</strong> You must be at least 18 years old or
        the age of majority in your jurisdiction to use this website. By using this website, you
        represent and warrant that you meet this requirement.
      </p>
      <p className="text-base text-zinc-300 mb-2">
        <strong className="text-zinc-200">User Conduct:</strong> You agree to use this website only
        for lawful purposes and in accordance with these Terms of Service. You agree not to:
      </p>
      <ul className="list-disc list-inside text-base text-zinc-300 mb-2 space-y-2 ml-4">
        <li>Use the website in any way that violates applicable laws or regulations</li>
        <li>Transmit any malicious code, viruses, or harmful content</li>
        <li>Attempt to gain unauthorized access to any portion of the website</li>
        <li>Interfere with or disrupt the website or servers connected to it</li>
        <li>Use automated systems to access the website without permission</li>
      </ul>
      <p className="text-base text-zinc-300">
        We reserve the right to terminate or suspend your access to the website immediately, without
        prior notice, for conduct that we believe violates these Terms of Service or is harmful to
        other users, us, or third parties.
      </p>
    </section>
  );
};

export default UseOfServicesSection;
