import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useSelector, shallowEqual } from 'react-redux';

import FacebookIcon from '@Components/Icon/FacebookIcon';
import TwitterIcon from '@Components/Icon/TwitterIcon';
import GoogleIcon from '@Components/Icon/GoogleIcon';


const useStyles = createUseStyles(({
  root: {
    boxSizing: 'border-box',
    padding: [48, 0],
    backgroundColor: '#fafafb',
  },
  links: {
    listStyleType: 'none',
    textAlign: 'center',
  },
  linkItem: {
    display: 'inline-block',
    lineHeight: 1.5,
    margin: [8, 16],
  },
  buttons: {
    paddingTop: 24,
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
  const { seoData } = useSelector(state => ({
    seoData: state.getIn(['home', 'seoData']),
  }), shallowEqual);

  return (
    <footer className={classNames(classes.root)}>
      <ul className={classNames(classes.links)}>
        <li className={classNames(classes.linkItem)}>ABOUT US</li>
        <li className={classNames(classes.linkItem)}>TERM OF USE</li>
        <li className={classNames(classes.linkItem)}>PRIVACY POLICY</li>
        <li className={classNames(classes.linkItem)}>FOLLOW US?</li>
      </ul>
      <div className={classNames(classes.buttons)}>
        <a className={classNames(classes.button)} href={seoData.get('facebook')} target='_blank' rel='noopener noreferrer'>
          <FacebookIcon size='36px' />
        </a>
        <a className={classNames(classes.button)} href={seoData.get('twitter')} target='_blank' rel='noopener noreferrer'>
          <TwitterIcon size='36px' />
        </a>
        <a className={classNames(classes.button)} href={seoData.get('google')} target='_blank' rel='noopener noreferrer'>
          <GoogleIcon size='40px' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
