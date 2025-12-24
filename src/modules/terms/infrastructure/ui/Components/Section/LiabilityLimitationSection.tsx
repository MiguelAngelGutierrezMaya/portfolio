//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './LiabilityLimitationSection.css';

const LiabilityLimitationSection: React.FC = () => {
  return (
    <section className="liability-limitation-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
      <p className="text-base text-zinc-300 mb-2">
        This website is provided "as is" and "as available" without warranties of any kind, either
        express or implied. We do not guarantee that the website will be uninterrupted, secure, or
        error-free.
      </p>
      <p className="text-base text-zinc-300 mb-2">
        To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
        special, consequential, or punitive damages arising out of or relating to your use of this
        website, including but not limited to loss of profits, data, or business opportunities.
      </p>
      <p className="text-base text-zinc-300">
        Our total liability for any claims related to the website shall not exceed the amount you
        have paid to us, if any, for accessing the website. Some jurisdictions do not allow the
        exclusion of certain warranties or limitations of liability, so some of the above
        limitations may not apply to you.
      </p>
    </section>
  );
};

export default LiabilityLimitationSection;
