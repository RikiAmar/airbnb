import {create} from 'zustand';

interface ILoginModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<ILoginModalStore>((set) => ({
    //CHANGE TO TRUE TO SHOW THE MODAL
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;