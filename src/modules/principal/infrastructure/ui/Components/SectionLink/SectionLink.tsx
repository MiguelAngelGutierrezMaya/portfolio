//
// React dependencies
//
import React, {type MouseEvent} from 'react';

interface SectionLinkProps {
    title: string;
    onClick: () => void;
}

const SectionLink: React.FC<SectionLinkProps> = ({title, onClick}) => {
    return (
        <a className={'font-poppins text-white cursor-pointer hover:text-white/90'} onClick={
            (event: MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                onClick();
            }
        }>{title}</a>
    )
}

export default SectionLink;

