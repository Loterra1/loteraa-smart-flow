import clsx from 'clsx';
import React, { ReactNode, useEffect } from 'react';

type Props = {
   open: boolean;
   onClose?: () => void;
   children?: ReactNode;
};

export default function Modal({ open, onClose, children }: Props) {
   const handleClick = () => {
      if (onClose) {
         onClose();
      }
   };

   useEffect(() => {
      if (open) {
         if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
         }
      } else document.body.style.overflow = 'unset';

      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [open]);

   return (
      <div
         className={clsx(
            'w-screen h-screen fixed left-0 top-0 z-10',
            open ? 'block' : 'hidden'
         )}
      >
         <div
            onClick={handleClick}
            className="w-full h-full fixed left-0 top-0 bg-black/40"
         ></div>
         {children}
      </div>
   );
}
