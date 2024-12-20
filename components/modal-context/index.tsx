'use client';

import { MODAL_TYPE } from '@/utils/constants';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalState {
  isOpen: boolean;
  title?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onSubmitCallback?: (data?: any) => void;
}
export type ModalType = keyof typeof MODAL_TYPE;
interface ModalContextType {
  modalData: { [key in ModalType]: ModalState };
  setModalData: (data: { [key in ModalType]: ModalState }) => void;
  closeModal: (modalType: ModalType) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * Hook to get the modal context.
 *
 * @throws {Error} if used outside of ModalProvider.
 *
 * @returns {ModalContextType} The modal context.
 */
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider');
  }
  return context;
};

/**
 * Provides the modal context to the components.
 *
 * @param {{ children: ReactNode }} props
 * @prop {ReactNode} children The children components.
 * @returns {JSX.Element} The ModalContext provider.
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const defaultModalState: { [key in ModalType]: ModalState } = Object.keys(
    MODAL_TYPE
  ).reduce(
    (acc, type) => {
      acc[type as ModalType] = { isOpen: false };
      return acc;
    },
    {} as { [key in ModalType]: ModalState }
  );

  const [modalData, setModalData] = useState<{
    [key in ModalType]: ModalState;
  }>(defaultModalState);

  // Close Modal Function
  const closeModal = (modalType: ModalType) => {
    setModalData((prev) => ({
      ...prev,
      [modalType]: {
        ...prev[modalType],
        isOpen: false
      }
    }));
  };

  // Close All Modals Function
  const closeAllModals = () => {
    setModalData((prev) => {
      const newModalState = { ...prev };
      Object.keys(newModalState).forEach((key) => {
        newModalState[key as ModalType].isOpen = false;
      });
      return newModalState;
    });
  };

  return (
    <ModalContext.Provider
      value={{ modalData, setModalData, closeModal, closeAllModals }}
    >
      {children}
    </ModalContext.Provider>
  );
};
