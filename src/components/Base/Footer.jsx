import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiGoogleAds } from '@mdi/js';

const useStyles = createUseStyles(({
  root: {
    boxSizing: 'border-box',
  },
  links: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'center',
  },
  linkItem: {
    lineHeight: 1.5,
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
    padding: 0,
    '& + &': {
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
          <Icon path={mdiGoogleAds} size={1.5} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
