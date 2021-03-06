import React, {
  forwardRef,
  useState,
  useEffect,
} from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const labelAnimate = 'translateY(-42%) scale(.85)';

const useStyles = createUseStyles(({
  root: {
    position: 'relative',
  },
  input: {
    width: '100%',
    borderRadius: 4,
    fontSize: 14,
    height: 50,
    zIndex: 1,
    padding: [28, 16, 8],
    color: '#2c2c2c',
    background: '#ffffff',
    border: '1px solid #929292',
    boxSizing: 'border-box',
    boxShadow: '0px 2px 9px 0px rgba(0,93,205,0.1)',
    '-webkit-transition': 'border .3s',
    transition: 'border .3s',
    '&:focus, &:not(:disabled):hover': {
      borderColor: '#1877f2',
    },
    '&:focus + label': {
      '-webkit-transform': labelAnimate,
      '-ms-transform': labelAnimate,
      transform: labelAnimate,
    },
    '&:-webkit-autofill + label': {
      transform: labelAnimate,
      '-webkit-transform': labelAnimate,
    },
    '&:not([value=""]) + label': {
      '-webkit-transform': labelAnimate,
      '-ms-transform': labelAnimate,
      transform: labelAnimate,
    },
    '&:disabled': {
      opacity: 0.65,
      cursor: 'not-allowed',
    },
  },
  label: {
    position: 'absolute',
    height: 20,
    lineHeight: '20px',
    top: '50%',
    marginTop: -10,
    fontSize: 16,
    color: '#929292',
    left: 0,
    paddingLeft: 20,
    zIndex: 2,
    cursor: 'text',
    '-webkit-transform-origin': 'top left',
    '-ms-transform-origin': 'top left',
    'transform-origin': 'top left',
    '-webkit-transition': 'all .2s ease-out',
    '-o-transition': 'all .2s ease-out',
    transition: 'all .2s ease-out',
  },
  labelFocus: {
    '-webkit-transform': labelAnimate,
    '-ms-transform': labelAnimate,
    transform: labelAnimate,
  },
  hasAddon: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}), {
  name: 'FloatLableInput',
});

const CustomFloatLabelInput = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    hasAddon,
    className: classNameProp,
    disabled,
    ...resetProps
  } = props;

  const [label, setLabel] = useState(placeholder);
  const classes = useStyles();

  useEffect(() => {
    if (placeholder && placeholder !== label) {
      setLabel(placeholder);
    }
  }, [placeholder]);


  return (
    <div className={classNames(classes.root)}>
      <input
        name={name}
        id={name}
        disabled={disabled}
        className={classNames({
          [classes.input]: true,
          [classes.hasAddon]: hasAddon,
          [classNameProp]: classNameProp,
          [classes.disabled]: disabled,
        })}
        ref={ref}
        {...resetProps}
      />
      <label htmlFor={name} className={classNames(classes.label)}>{placeholder}</label>
    </div>
  );
});

CustomFloatLabelInput.defaultProps = {
  placeholder: '',
  hasAddon: false,
  className: '',
  disabled: false,
};

CustomFloatLabelInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hasAddon: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CustomFloatLabelInput;
