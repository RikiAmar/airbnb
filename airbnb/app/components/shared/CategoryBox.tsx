"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter(); //יכולים להוסיף באופן דינאמי דברים ל URL
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {}; //שאילתא נוכחית - הפרמטרים בתוך היואראל הנוכחי

    if (params) {
      currentQuery = qs.parse(params.toString());//הופך לאובייקט
    }
    const updatedQuery: any = { ...currentQuery, category: label };
    //בדיקה האם הקטגוריה נלחצה
    if (params?.get("category") === label) {
        delete updatedQuery.category;// דליט מילה שור של ג.ס שמוחקת דברים מהאובייקט
    }
    const url = qs.stringifyUrl({
        url: "/",
        query: updatedQuery
    }, { skipNull: true})
    router.push(url);//מרנדר ללא רפרש וגם שולח את היואראל המעודכן
  }, [label, params, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
