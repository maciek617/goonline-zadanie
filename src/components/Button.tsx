import { ButtonProps } from '../interfaces';

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <button className='styled_button'>{text}</button>;
};

export default Button;
