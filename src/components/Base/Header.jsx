import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Link } from '@Server/routes';

const useStyles = createUseStyles(({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [0, 24],
    height: 68,
    boxSizing: 'border-box',
    borderBottom: '1px solid #cfcfcf',
  },
  start: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    fontSize: 24,
    cursor: 'pointer',
    color: '#484848',
    alignSelf: 'stretch',
  },
  logoIcon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    marginRight: 12,
    backgroundColor: '#85A5FF',
    color: '#ffffff',
  },
  addTopics: {
    outline: 'transparent',
    border: 'unset',
    padding: [8, 16],
    margin: [0, 36],
    backgroundColor: 'rgba(0, 0, 0, 0.025)',
    cursor: 'pointer',
    borderRadius: 4,
    color: '#929292',
    fontSize: 18,
    transition: 'color .15s',
    '&:hover': {
      color: '#2c2c2c',
    },
  },
}), {
  name: 'Header',
});

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classNames(classes.root)}>
      <div className={classNames(classes.start)}>
        <Link route='/'>
          <h1 className={classNames(classes.logo)}>
            <span className={classNames(classes.logoIcon)}>S</span>
            <span>ishare</span>
          </h1>
        </Link>
        <button className={classNames(classes.addTopics)} type='button'>
          Add Topics
        </button>
      </div>
      <div className={classNames(classes.start)}>
        end
      </div>
    </header>
  );
};

export default Header;
