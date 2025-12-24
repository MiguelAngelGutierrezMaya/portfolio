//
// React dependencies
//
import React from 'react';

//
// Styles
//
import './UserContentSection.css';

const UserContentSection: React.FC = () => {
  return (
    <section className="user-content-section my-8">
      <h2 className="text-2xl font-bold text-white mb-4">4. User Content</h2>
      <p className="text-base text-zinc-300 mb-2">
        When you submit content through our contact form, chatbot, or other communication channels,
        you retain all rights to that content. However, by submitting content, you grant us a
        non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content
        for the purpose of responding to your inquiries and operating the website.
      </p>
      <p className="text-base text-zinc-300">
        You are solely responsible for the content you submit and represent that you have the right
        to submit such content. We reserve the right to remove any content that violates these Terms
        of Service or is otherwise objectionable.
      </p>
    </section>
  );
};

export default UserContentSection;
