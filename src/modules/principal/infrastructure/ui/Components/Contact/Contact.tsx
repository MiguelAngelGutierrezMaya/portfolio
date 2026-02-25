//
// React dependencies
//
import React from 'react';
import { useContactLogic } from '@principal/infrastructure/ui/Components/Contact/UseContactLogic';

// Use type Record<never, never> instead of empty interface
type ContactProps = Record<never, never>;

const Contact: React.FC<ContactProps> = () => {
  //
  // Hooks
  //
  const { isIntersecting, divElement, errors, isSending, onSubmit } = useContactLogic();

  return (
    <div
      id={'contact'}
      ref={divElement}
      className={`${isIntersecting ? 'animate-fade-left' : ''} w-full mt-14 mb-20 pl-6 pr-6`}
    >
      <div className="relative px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <div className="max-w-2xl">
            <form
              id={'contact-form'}
              onSubmit={onSubmit}
              className="rounded-2xl border border-zinc-100 p-6 border-zinc-700/40"
            >
              <h2 className="flex text-3xl font-semibold text-zinc-100">Get in touch</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Give me the opportunity to be part of your team
              </p>
              <div className="mt-6 flex flex-col gap-4">
                <input
                  id={'input-name'}
                  name={'name'}
                  placeholder="What's your name?"
                  aria-label="What's your name?"
                  className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm border-zinc-700 bg-zinc-700/[0.15] text-zinc-200"
                  type="text"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">
                    Name is required and must be at least 3 characters
                  </p>
                )}
                <input
                  name={'email'}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm border-zinc-700 bg-zinc-700/[0.15] text-zinc-200"
                  type="text"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">Email doesn't have the correct format</p>
                )}
                <textarea
                  name={'message'}
                  placeholder={'Write your message'}
                  aria-label={'Write your message'}
                  className={
                    'min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm border-zinc-700 bg-zinc-700/[0.15] text-zinc-200 h-32 resize-none'
                  }
                />
                {errors.message && <p className="text-sm text-red-600">Message is required</p>}
                <button
                  disabled={isSending}
                  className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none font-semibold text-zinc-100 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-700 active:text-zinc-100/70 flex-none"
                  type="submit"
                >
                  {(isSending && (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      ... Sending
                    </>
                  )) ||
                    'Send message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
