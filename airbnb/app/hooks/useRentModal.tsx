import {create} from 'zustand';

interface IRentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRentModal = create<IRentModalStore>((set) => ({
    //CHANGE TO TRUE TO SHOW THE MODAL
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useRentModal;