import { useEffect, useState } from 'react';

type Props = {
  round?: boolean;
  onChange?: (_value: string) => void;
  type?: string;
  value?: any;
  placeholder?: string;
  classes?: {
    root?: string;
    input?: string;
  };
};

const Input = ({
  round = false,
  onChange = (_value) => false,
  type = 'text',
  value = '',
  placeholder = '',
  classes = {
    root: '',
    input: '',
  },
}: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    onChange(inputValue);
  }, [inputValue, onChange]);
  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        type={type}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
