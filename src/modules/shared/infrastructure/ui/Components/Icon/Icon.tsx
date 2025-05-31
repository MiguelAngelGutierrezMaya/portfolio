//
// React dependencies
//
import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6';

interface IconProps {
  icon: string;
  url?: string;
  key?: number | string;
  [key: string]: string | number | undefined;
}

const Icon: React.FC<IconProps> = (iconData: IconProps) => {
  //
  // Computed
  //
  const getIcon = (): React.JSX.Element => {
    const map: { [key: string]: React.JSX.Element } = {
      twitter: <FaTwitter size={30} />,
      github: <FaGithub size={30} />,
      linkedin: <FaLinkedin size={30} />,
      instagram: <FaInstagram size={30} />,
    };

    return map[iconData.icon] || <></>;
  };

  return (
    <a
      aria-label={'social-link-' + iconData.icon}
      target={'_blank'}
      className={
        'animate-jump-in animate-duration-[350ms] cursor-pointer text-white hover:text-white/90'
      }
      href={iconData.url || '#'}
      rel="noreferrer"
    >
      {getIcon()}
    </a>
  );
};

export default Icon;
