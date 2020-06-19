import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiGoogle } from '@mdi/js';

const useStyles = createUseStyles(({
  root: {
    boxSizing: 'border-box',
    padding: [48, 0],
    backgroundColor: '#fafafb',
  },
  links: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'center',
  },
  linkItem: {
    fontSize: 18,
    lineHeight: 1.5,
    margin: [0, 16],
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'transparent',
    border: 'none',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
    '& + &': {
      marginLeft: 24,
    },
  },
}), {
  name: 'Footer',
});

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classNames(classes.root)}>
      <ul className={classNames(classes.links)}>
        <li className={classNames(classes.linkItem)}>ABOUT US</li>
        <li className={classNames(classes.linkItem)}>TERM OF USE</li>
        <li className={classNames(classes.linkItem)}>PRIVACY POLICY</li>
        <li className={classNames(classes.linkItem)}>FOLLOW US?</li>
      </ul>
      <div className={classNames(classes.buttons)}>
        <button className={classNames(classes.button)} type='button'>
          <Icon path={mdiFacebook} size={1.5} />
        </button>
        <button className={classNames(classes.button)} type='button'>
          <Icon path={mdiTwitter} size={1.5} />
        </button>
        <button className={classNames(classes.button)} type='button'>
          <Icon path={mdiGoogle} size={1.5} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
