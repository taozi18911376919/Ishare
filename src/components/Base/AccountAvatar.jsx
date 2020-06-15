import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import murmurhash from 'murmurhash';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyle = createUseStyles(({
  root: {
    borderRadius: '50%',
    color: '#ffffff',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    height: 96,
    fontSize: 48,
  },
  small: {
    width: 42,
    height: 42,
    fontSize: 24,
  },
}), {
  name: 'AccountAvatar',
});

const AccountAvatar = ({ name, isSmall }) => {
  const classes = useStyle();
  const [firstChart, setFirstChart] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const className = classNames({
    [classes.root]: true,
    [classes.small]: isSmall,
  });

  useEffect(() => {
    if (name) {
      setFirstChart(name.substring(1, 0).toUpperCase());
    }
  }, [name]);

  useEffect(() => {
    if (firstChart) {
      const hex = murmurhash.v3(firstChart).toString(16).substring(0, 6);
      setBackgroundColor(`#${hex}`);
    }
  }, [firstChart]);

  return (
    <div className={className} style={{ backgroundColor }}>
      {firstChart}
    </div>
  );
};

AccountAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  isSmall: PropTypes.bool,
};

AccountAvatar.defaultProps = {
  isSmall: false,
};

export default AccountAvatar;
