"use client";
import React from "react";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiDesert,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";
import Container from "../shared/Container";
import CategoryBox from "../shared/CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: "Pools",
    icon: TbPool,
    description: 'This property has a pool!',
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: 'This property is close to a lake!',
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: 'This property has skiing activities!',
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: 'This property is in a castle!',
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: 'This property has camping activities!',
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: 'This property is in arctic grounds!',
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: 'This property is near a cave!',
  },
  {
    label: "Desert",
    icon: GiDesert,
    description: 'This property is in the desert! its hot there!',
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: 'This property is in the barn!',
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: 'This property is exclusive and luxerious!',
  },
];

const Categories = () => {
  const parms = useSearchParams();//כל הפרמטרים מגיעים דרכו
  const categorieParm = parms?.get("category");
  const pathName = usePathname(); //מכיל את כל ה URL

  const isMainPage = pathName === "/";

  return <>{!isMainPage ? null : <Container>
    <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((category) => (
            <CategoryBox key = {category.label} label={category.label} icon={category.icon} selected={categorieParm === category.label}/>
        ))}
    </div>

    </Container>}</>;
};

export default Categories;
