//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './ServiceDescriptionSection.css';

const ServiceDescriptionSection: React.FC = () => {
  return (
    <section className="service-description-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
      <p className="text-base text-zinc-300 mb-2">
        This portfolio website provides information about my professional background, skills,
        experiences, and projects. The website may include features such as:
      </p>
      <ul className="list-disc list-inside text-base text-zinc-300 mb-2 space-y-2 ml-4">
        <li>Portfolio presentation and project showcases</li>
        <li>Contact form for professional inquiries</li>
        <li>Information about professional services and collaboration opportunities</li>
        <li>Communication through chatbot or direct contact methods</li>
      </ul>
      <p className="text-base text-zinc-300">
        We reserve the right to modify or discontinue any aspect of this website at any time without
        prior notice.
      </p>
    </section>
  );
};

export default ServiceDescriptionSection;
