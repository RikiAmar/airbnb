import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";
//כאן אנחנו שולחים משהו
interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  //בודקים האם האייקון נלחץ מחזיר בוליאני
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId); //מחזירה בוליאני האם נלחץ או לא
  }, [currentUser?.favoriteIds, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation(); //preventdefault
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let req; //פונקציה שמוסיפה ומוחקת מועדפים
        if (hasFavorited) {
          req = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          req = () => axios.post(`/api/favorites/${listingId}`);
        }
        await req(); //חשוב שיהיה אחרי הIF
        router.refresh(); //רינדור מחדש
        toast.success(
          hasFavorited ?  "Deleted from favorites " : "Saved to favorites" 
        );
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );
return {toggleFavorite, hasFavorited};
};

export default useFavorite;
