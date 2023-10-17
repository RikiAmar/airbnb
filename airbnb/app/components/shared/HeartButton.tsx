"use client";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface IHeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<IHeartButtonProps> = ({listingId, currentUser}) => {
  const {hasFavorited, toggleFavorite } = useFavorite({listingId, currentUser});

  return <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
  {/* //לא מלא */}
  <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
  {/* // מלא */}
  <AiFillHeart size={24} className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} />
</div>;
};

export default HeartButton;
