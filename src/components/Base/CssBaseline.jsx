/* eslint-disable max-len */
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({
  '@global': {
    '@font-face': [
      {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 300,
        src: `
          local('Roboto Light'),
          url('/static/fonts/Roboto-Light.ttf') format('trueType')
        `,
      },
      {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 400,
        src: `
          local('Roboto Regular'),
          url('/static/fonts/Roboto-Regular.ttf') format('trueType')
        `,
      },
      {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 700,
        src: `
          local('Roboto Bold'),
          url('/static/fonts/Roboto-Bold.ttf') format('trueType')
        `,
      },
    ],
    /* Make clicks pass-through */
    '#nprogress': {
      pointerEvents: 'none',
    },
    '#nprogress .bar': {
      background: '#29d',
      position: 'fixed',
      zIndex: 1031,
      top: 0,
      left: 0,
      width: '100%',
      height: 2,
    },
    html: {
      lineheight: 1.15,
      '-webkit-text-size-adjust': '100%',
    },
    body: {
      width: '100%',
      margin: 0,
      boxSizing: 'border-box',
      fontSize: 16,
      color: '#2c2c2c',
      backgroundColor: '#ffffff',
      fontFamily: 'Roboto, "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    main: {
      display: 'block',
    },
    h1: {
      fontSize: '2em',
    },
    hr: {
      boxSizing: 'content-box',
      height: 1,
      backgroundColor: '#cfcfcf',
      overflow: 'visible',
      margin: [0, 0, 20, 0],
    },
    pre: {
      fontFamily: 'monospace, monospace',
      fontSize: '1em',
    },
    a: {
      backgroundColor: 'transparent',
      textDecoration: 'none',
      color: '#2c2c2c',
      '&:hover': {
        color: '#85a5ff',
      },
    },
    svg: {
      verticalAlign: 'middle',
    },
    'abbr[title]': {
      borderBottom: 'none',
      textDecoration: 'underline dotted',
    },
    'b, strong': {
      fontWeight: 'bolder',
    },
    'code, kbd, samp': {
      fontFamily: 'monospace, monospace',
      fontSize: '1em',
    },
    small: {
      fontSize: '80%',
    },
    'sub, sup': {
      fontSize: '75%',
      lineheight: 0,
      position: 'relative',
      verticalAlign: 'baseline',
    },
    sub: {
      bottom: '-0.25em',
    },
    sup: {
      top: '-0.5em',
    },
    img: {
      borderStyle: 'none',
      verticalAlign: 'top',
    },
    'button, input, optgroup, select, textarea': {
      fontFamily: 'inherit',
      fontSize: '100%',
      lineHeight: '1.15',
      margin: 0,
    },
    'button, input': {
      overflow: 'visible',
    },
    'button, select': {
      textTransform: 'none',
    },
    'button, [type="button"], [type="reset"], [type="submit"]': {
      '-webkit-appearance': 'button',
    },
    'button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner': {
      borderStyle: 'none',
      padding: 0,
    },
    'button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring': {
      outline: '1px dotted ButtonText',
    },
    fieldset: {
      padding: '0.35em 0.75em 0.625em',
    },
    legend: {
      boxsizing: 'border-box',
      color: 'inherit',
      display: 'table',
      maxWidth: '100%',
      padding: 0,
      whiteSpace: 'normal',
    },
    progress: {
      verticalAlign: 'baseline',
    },
    textarea: {
      overflow: 'auto',
    },
    '[type="checkbox"], [type="radio"]': {
      boxSizing: 'border-box',
      padding: 0,
    },
    '[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button': {
      height: 'auto',
    },
    '[type="search"]': {
      '-webkit-appearance': 'textfield',
      outlineOffset: '-2px',
    },
    '[type="search"]::-webkit-search-decoration': {
      '-webkit-appearance': 'none',
    },
    '::-webkit-file-upload-button': {
      '-webkit-appearance': 'button',
      font: 'inherit',
    },
    details: {
      display: 'block',
    },
    summary: {
      display: 'list-item',
    },
    template: {
      display: 'none',
    },
    '[hidden]': {
      display: 'none',
    },
    '#__next': {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}), {
  root: 'CssBaseline',
});

const CssBaseline = () => {
  useStyles();
  return <></>;
};

export default CssBaseline;
