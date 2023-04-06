import { ChangeEvent, useState } from 'react';
import Button from './Button';
import { hexToHsl } from '../helpers/hexToHSL';
import { hexToRgb } from '../helpers/hexToRgb';
import { AddColorFormProps } from '../interfaces';

const AddColorForm: React.FC<AddColorFormProps> = ({
  allColors,
  setAllColors,
}) => {
  const [color, setColor] = useState('');
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const invalidCharsRegex = /[^a-fA-F0-9#]/g;

    if (event.target.value.length > 7) return;

    if (event.target.value.match(invalidCharsRegex)) {
      // Remove any characters that are not hexadecimal digits
      const updatedValue = event.target.value.replace(invalidCharsRegex, '');
      setColor(updatedValue);
    } else {
      // Replace all "#" except the first one
      setColor(event.target.value.replace(/([^#])(#)/g, '$1'));
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (color.length !== 7) return;
    updateColors();
  };

  const updateColors = () => {
    const hexRegex = /^#?([a-fA-F0-9]{6})$/;

    const match = color.match(hexRegex);
    if (!match) {
      alert(`Invalid HEX string: ${color}`);
      return;
    }

    localStorage.setItem(
      'colors',
      JSON.stringify([
        {
          hex: color,
          rgb: hexToRgb(color),
          hsl: hexToHsl(color),
          isPredefined: false,
        },
        ...allColors,
      ])
    );
    setAllColors([
      {
        hex: color,
        rgb: hexToRgb(color),
        hsl: hexToHsl(color),
        isPredefined: false,
      },
      ...allColors,
    ]);
    setColor('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='#00000'
        className='styled_input'
        maxLength={7}
        minLength={7}
        onChange={handleInputChange}
        value={color}
      />
      <Button text='Add color' />
    </form>
  );
};

export default AddColorForm;
