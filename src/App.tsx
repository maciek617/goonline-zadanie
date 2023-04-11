import { useState, useEffect } from 'react';
import FilterColors from './components/FilterColors';
import AddColorForm from './components/AddColorForm';
import SingleColor from './components/SingleColor';
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

  return (
    <div className='addColor_wrapper'>
      <h1>Add color to database</h1>

      <AddColorForm allColors={allColors} setAllColors={setAllColors} />
      <FilterColors
        sortedColors={sortedColors}
        setFilteredColors={setFilteredColors}
        setSortedColors={setSortedColors}
        allColors={allColors}
        filteredColors={filteredColors}
      />
      <div className='rectangles-wrapper'>
        {(sortedColors || predefinedColors).map((color, index) => {
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
