//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './TermsModificationsSection.css';

const TermsModificationsSection: React.FC = () => {
  return (
    <section className="terms-modifications-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">6. Modifications to Terms</h2>
      <p className="text-base text-zinc-300 mb-2">
        We reserve the right to modify these Terms of Service at any time. If we make changes, we
        will update the "Last Updated" date at the top of this page and may provide notice through
        the website or other appropriate means.
      </p>
      <p className="text-base text-zinc-300">
        Your continued use of the website after any modifications to these terms constitutes your
        acceptance of the updated terms. If you do not agree to the modified terms, you should
        discontinue your use of the website.
      </p>
    </section>
  );
};

export default TermsModificationsSection;
