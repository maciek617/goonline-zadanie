import { useState, useEffect } from 'react';
import FilterColors from './components/FilterColors';
import AddColorForm from './components/AddColorForm';
import SingleColor from './components/SingleColor';
import { extractRgbValues } from './helpers/extractRgbValues';
import { predefinedColors } from './helpers/predefinedArray';
import { allColorObj } from './interfaces';
import './App.scss';

function App() {
  const [allColors, setAllColors] = useState<allColorObj[]>([]);
  const [sortedColors, setSortedColors] = useState<allColorObj[]>([]);
  const [filteredColors, setFilteredColors] = useState<allColorObj[]>([]);

  useEffect(() => {
    const storedColors = localStorage.getItem('colors');
    if (storedColors) {
      setAllColors(JSON.parse(storedColors));
    } else {
      localStorage.setItem('colors', JSON.stringify(predefinedColors));
    }
  }, []);

  useEffect(() => {
    const sortArrayOfColors = () => {
      const newColors = [...allColors].sort((a, b) => {
        const [aR, aG, aB] = extractRgbValues(a.rgb);
        const [bR, bG, bB] = extractRgbValues(b.rgb);

        if (aR !== bR) {
          return bR - aR; // Higher red value first
        }
        if (aG !== bG) {
          return bG - aG; // Higher green value next
        }
        return bB - aB; // Finally, higher blue value
      });
      setSortedColors(newColors);
    };
    sortArrayOfColors();
  }, [allColors]);

  return (
    <div className='addColor_wrapper'>
      <h1>Add color to database</h1>

      <AddColorForm allColors={allColors} setAllColors={setAllColors} />
      <FilterColors
        sortedColors={sortedColors}
        setFilteredColors={setFilteredColors}
      />
      <div className='rectangles-wrapper'>
        {filteredColors.map((color, index) => {
          return (
            // Class component
            <SingleColor
              key={index}
              hexColor={color.hex}
              index={index}
              isPredefined={color.isPredefined}
              setFilteredColors={setFilteredColors}
              filteredColors={filteredColors}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
