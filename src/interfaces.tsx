export interface allColorObj {
  hex: string;
  rgb: string;
  hsl: string;
  isPredefined: boolean;
}

export interface SingleColorProps {
  hexColor: string;
  isPredefined: boolean;
  index: number;
  setFilteredColors: React.Dispatch<React.SetStateAction<allColorObj[]>>;
  filteredColors: allColorObj[];
}

export interface AddColorFormProps {
  allColors: allColorObj[];
  setAllColors: React.Dispatch<React.SetStateAction<allColorObj[]>>;
}

export interface FilterColorsProps {
  setFilteredColors: (el: allColorObj[]) => void;
  sortedColors: allColorObj[];
  setSortedColors: React.Dispatch<React.SetStateAction<allColorObj[]>>;
  allColors: allColorObj[];
  filteredColors: allColorObj[];
}

export interface ButtonProps {
  text: string;
}
