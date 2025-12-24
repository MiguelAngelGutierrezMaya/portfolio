//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './PolicyIntroduction.css';

const PolicyIntroduction: React.FC = () => {
  return (
    <section className="policy-introduction-section my-8">
      <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
      <p className="text-base text-zinc-300 mb-2">
        <strong className="text-zinc-200">Last Updated:</strong>{' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <p className="text-base text-zinc-300">
        This Privacy Policy describes how we collect, use, and protect your personal information
        when you interact with this portfolio website. We are committed to protecting your privacy
        and handling your data responsibly in accordance with applicable data protection laws.
      </p>
    </section>
  );
};

export default PolicyIntroduction;
