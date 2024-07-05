//
// React dependencies
//
import React, {type MouseEvent} from 'react';

interface SectionLinkProps {
    title: string;
    className?: string;
    onClick: () => void;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const SectionLink: React.FC<SectionLinkProps> = ({title, onClick, className}) => {
    return (
        <a className={classNames('font-poppins cursor-pointer', className || '')} onClick={
            (event: MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                onClick();
            }
        }>{title}</a>
    )
}

export default SectionLink;

