//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './TermsIntroduction.css';

const TermsIntroduction: React.FC = () => {
  return (
    <section className="terms-introduction-section my-8">
      <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
      <p className="text-base text-zinc-300 mb-2">
        <strong className="text-zinc-200">Last Updated:</strong>{' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <p className="text-base text-zinc-300">
        Welcome to this portfolio website. By accessing or using this website, you agree to comply
        with and be bound by the following Terms of Service. Please read these terms carefully
        before using the website.
      </p>
    </section>
  );
};

export default TermsIntroduction;
