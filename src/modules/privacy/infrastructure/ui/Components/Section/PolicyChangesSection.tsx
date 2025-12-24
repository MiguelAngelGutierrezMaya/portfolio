//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './PolicyChangesSection.css';

const PolicyChangesSection: React.FC = () => {
  return (
    <section className="policy-changes-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
      <p className="text-base text-zinc-300 mb-2">
        We may update this Privacy Policy from time to time to reflect changes in our practices,
        technology, legal requirements, or other factors. When we make changes, we will update the
        "Last Updated" date at the top of this policy.
      </p>
      <p className="text-base text-zinc-300">
        We encourage you to review this Privacy Policy periodically to stay informed about how we
        handle your personal information. If we make material changes that significantly affect your
        rights or how we use your information, we will provide notice through this website or other
        appropriate means.
      </p>
    </section>
  );
};

export default PolicyChangesSection;
