import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import _camelCase from 'lodash.camelcase';
import _get from 'lodash.get';
import { memo } from 'react';

type PrimaryButtonProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  helperText?: string;
  isError?: boolean;
  hasClear?: boolean;
  callbackChange?: (value: string) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '24px',
    lineHeight: '28px',
    marginTop: '0 !important',
  },
  input: {
    padding: '13px 0',
    borderBottom: `2px solid ${theme.colors.green.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
      lineHeight: '24px',
      borderWidth: '1px',
    },
  },
}));

function InputComponent({
  label,
  value,
  placeholder,
  helperText,
  isError,
  hasClear,
  callbackChange = () => false,
}: PrimaryButtonProps): JSX.Element {
  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    const value = _get(event, ['currentTarget', 'value'], '');
    callbackChange(value);
  };

  const handleClick = (event: React.SyntheticEvent<EventTarget>) => {
    callbackChange('');
  };

  const handleMouseDown = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
  };

  return (
    <FormControl className="w-full">
      <label
        className="block text-primary-gray text-sm"
        htmlFor={_camelCase(label)}
      >
        {label}
      </label>
      <Input
        id={_camelCase(label)}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth={true}
        disableUnderline={true}
        classes={{
          root: classes.root,
          input: classes.input,
        }}
        endAdornment={
          <IconButton
            aria-label="clear value"
            onClick={handleClick}
            onMouseDown={handleMouseDown}
          >
            {hasClear && !!value && <CancelIcon fontSize="small" />}
          </IconButton>
        }
      />
      {isError && (
        <div className="block text-red text-sm mt-2">{helperText}</div>
      )}
    </FormControl>
  );
}

export default memo(InputComponent);
