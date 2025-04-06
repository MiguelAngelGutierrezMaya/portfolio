//
// React dependencies
//
import React, { type MouseEvent } from 'react';

//
// Components
//
import SectionLink from '@principal/infrastructure/ui/Components/SectionLink/SectionLink';
import { ArrowContainer, Popover } from 'react-tiny-popover';

//
// Hooks
//
import { useSectionLinkWithPopoverLogic } from '@principal/infrastructure/ui/Components/SectionLink/UseSectionLinkWithPopoverLogic';

interface SectionLinkWithPopoverProps {
  title: string;
  onClick: () => void;
  onClickWhasapp: () => void;
}

const SectionLinkWithPopover: React.FC<SectionLinkWithPopoverProps> = ({
  title,
  onClick,
  onClickWhasapp,
}) => {
  //
  // Hooks
  //
  const { isOpen, setIsOpen } = useSectionLinkWithPopoverLogic();

  return (
    <Popover
      isOpen={isOpen}
      positions={['bottom']}
      reposition={false}
      padding={15}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowSize={10}
          arrowColor={'white'}
        >
          <section className={'w-full p-6 rounded-lg bg-white flex flex-col items-center gap-2'}>
            <SectionLink
              className={'text-black cursor-pointer hover:text-black/90'}
              title={'Whatsapp'}
              onClick={() => onClickWhasapp()}
            />
            <SectionLink
              className={'text-black cursor-pointer hover:text-black/90'}
              title={'Email'}
              onClick={() => {
                setIsOpen(false);
                onClick();
              }}
            />
          </section>
        </ArrowContainer>
      )}
    >
      <button
        aria-label={'button-options-talk'}
        className={'font-poppins text-white cursor-pointer hover:text-white/90'}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        {title}
      </button>
    </Popover>
  );
};

export default SectionLinkWithPopover;
