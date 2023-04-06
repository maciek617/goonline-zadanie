import { useState, useEffect } from 'react';
import { extractRgbValues } from '../helpers/extractRgbValues';
import { extractSaturation } from '../helpers/extractSaturation';
import { FilterColorsProps } from '../interfaces';

const FilterColors: React.FC<FilterColorsProps> = ({
  setFilteredColors,
  sortedColors,
}) => {
  const [red, setRed] = useState(false);
  const [blue, setBlue] = useState(false);
  const [green, setGreen] = useState(false);
  const [saturation, setSaturation] = useState(false);

  useEffect(() => {
    setFilteredColors(
      sortedColors.filter((el) => {
        const [r, g, b] = extractRgbValues(el.rgb);
        const [saturationValue] = extractSaturation(el.hsl);

        return (
          (red && r > 127) ||
          (green && g > 127) ||
          (blue && b > 127) ||
          (saturation && saturationValue > 50) ||
          (!red && !green && !blue && !saturation)
        );
      })
    );
  }, [red, green, blue, saturation, sortedColors, setFilteredColors]);

  const arrayToMapOverConditions = [
    {
      text: 'Red > 50%',
      htmlFor: 'red',
      id: 'red',
      fn: setRed,
    },
    {
      text: 'Green > 50%',
      htmlFor: 'green',
      id: 'green',
      fn: setGreen,
    },
    {
      text: 'Blue > 50%',
      htmlFor: 'blue',
      id: 'blue',
      fn: setBlue,
    },
    {
      text: 'Saturation > 50%',
      htmlFor: 'saturation',
      id: 'saturation',
      fn: setSaturation,
    },
  ];

  const condition = arrayToMapOverConditions.map((el, index) => {
    return (
      <div className='condition' key={index}>
        <input
          type='checkbox'
          id={el.id}
          onChange={() => {
            el.fn((prev: boolean) => (prev = !prev));
          }}
        />
        <label htmlFor={el.htmlFor}>{el.text}</label>
      </div>
    );
  });
  return (
    <form className='condition_wrapper'>
      <h2>Possible conditions</h2>
      {condition}
    </form>
  );
};

export default FilterColors;
