import clsx from 'clsx';
import React, { ReactNode, useEffect } from 'react';

type Props = {
   open: boolean;
   onClose?: () => void;
   children?: ReactNode;
};

export default function Modal({ open, onClose, children }: Props) {
   const handleOverlayClick = () => {
      if (onClose) {
         onClose();
      }
   };

   const handleContentClick = (e: React.MouseEvent) => {
      // Prevent clicks inside the modal content from closing the modal
      e.stopPropagation();
   };

   useEffect(() => {
      if (open) {
         if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
         }
      } else {
         document.body.style.overflow = 'unset';
      }

      // Cleanup function
      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [open]);

   // Handle ESC key to close modal
   useEffect(() => {
      const handleEscKey = (e: KeyboardEvent) => {
         if (e.key === 'Escape' && onClose) {
            onClose();
         }
      };

      if (open) {
         document.addEventListener('keydown', handleEscKey);
         return () => document.removeEventListener('keydown', handleEscKey);
      }
   }, [open, onClose]);

   if (!open) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         {/* Overlay */}
         <div
            onClick={handleOverlayClick}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
         />

         {/* Modal Content */}
         <div
            onClick={handleContentClick}
            className="relative z-10 max-h-[90vh] overflow-y-auto"
         >
            {children}
         </div>
      </div>
   );
}
