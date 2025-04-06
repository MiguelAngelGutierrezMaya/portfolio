//
// React components
//
import React from 'react';
import ArticleContent from '@principal/infrastructure/ui/Components/Experiences/ArticleContent';

// Use type Record<never, never> instead of empty interface
type ExperiencesProps = Record<never, never>;

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL;

const Experiences: React.FC<ExperiencesProps> = () => {
  return (
    <div className="w-full mt-16 sm:mt-20 pl-6 pr-6">
      <div className="relative px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <div className="max-w-2xl">
            <h2
              id={'experiences-title'}
              className={'text-3xl font-semibold tracking-tight text-zinc-100'}
            >
              Work experiences
            </h2>
            <div className="mt-8 md:border-l md:border-zinc-100 md:pl-6 md:border-zinc-700/40">
              <div className="flex max-w-3xl flex-col space-y-16">
                <ArticleContent
                  companyImage={`${PUBLIC_FIREBASE_URL}/keybe-ai.avif?alt=media&token=1e8dc31e-7b54-4373-9c02-4825522c26f1`}
                  title={'Fullstack, mobile developer and frontend team leader'}
                  timeline={'September 13, 2021 - July 3, 2024'}
                  description={
                    'Development of web and a mobile application for\n' +
                    '                                            the chat manager, correcting errors for the web\n' +
                    '                                            application already made, proposing technologies\n' +
                    '                                            or methodologies for improvements in the software\n' +
                    '                                            development process, and managing the assigned\n' +
                    '                                            tasks'
                  }
                  datetime={'2024-07-03'}
                  url={'https://keybe.us/'}
                />
                <ArticleContent
                  companyImage={`${PUBLIC_FIREBASE_URL}/colegium.avif?alt=media&token=e0165306-ed3c-44f9-b23d-12d1b7eeb42d`}
                  title={'Backend developer'}
                  timeline={'January 01, 2021 - September 12, 2021'}
                  description={
                    'Development of functionalities for applications ' +
                    'already made, address requirements or incidents ' +
                    "presented in the company's cloud applications and " +
                    'propose options for improvements in the different ' +
                    "operations of the company's apps"
                  }
                  datetime={'2021-01-01'}
                  url={'https://www.colegium.com/'}
                />
                <ArticleContent
                  companyImage={`${PUBLIC_FIREBASE_URL}/pcaingenieria.avif?alt=media&token=d7b2e5c1-902d-4c8c-a9a1-50ecf4133106`}
                  title={'Fullstack developer'}
                  timeline={'June 18, 2019 - December 31, 2020'}
                  description={
                    'Development of custom applications for different\n' +
                    'clients, full-stack development, and support of\n' +
                    'applications made by third parties to associated\n' +
                    'companies'
                  }
                  datetime={'2019-06-18'}
                  url={'https://pcaingenieria.com/site/'}
                />
                <ArticleContent
                  companyImage={`${PUBLIC_FIREBASE_URL}/crealodigital.avif?alt=media&token=bbeff7af-2099-4e05-9106-7ee04200a929`}
                  title={'Fullstack developer'}
                  timeline={'March 02, 2019 - June 17, 2019'}
                  description={
                    'Fullstack development (Attend user requirements,\n' +
                    'propose and develop the model and code. Analysis\n' +
                    'and design, development and tests), document\n' +
                    'development process, propose technologies during\n' +
                    'program restructuring or for new programs, visit and\n' +
                    'train the clients involved, user support and attention'
                  }
                  datetime={'2024-07-03'}
                  url={'https://crealodigital.com/'}
                />
                <ArticleContent
                  companyImage={`${PUBLIC_FIREBASE_URL}/jetsetviajes.avif?alt=media&token=182432d4-c56b-4f63-8bde-cceb7f5f388b`}
                  title={'Fullstack developer'}
                  timeline={'December 01, 2018 - March 01, 2019'}
                  description={
                    "Support and maintain the company's information " +
                    'system, review, and solution of errors presented in ' +
                    'the admin platform, development of new functional ' +
                    'modules in the web application, information ' +
                    'documentation and progress, attend to user ' +
                    'requirements to evaluate the development process, ' +
                    'propose and develop (if approved) improvements in ' +
                    'the current functionalities of the application'
                  }
                  datetime={'2024-07-03'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
