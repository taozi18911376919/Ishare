import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';


import SignAction from '@Actions/sign';
import Loading from '@Components/Base/Loading';

const useStyles = createUseStyles(({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 68,
    boxSizing: 'border-box',
  },
}), {
  name: 'Redirect',
});

const Redirect = ({ token }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(SignAction.twitterSign({
        token,
      }));
    }
  }, [token]);

  return (
    <div className={classes.root}>
      <Loading />
    </div>
  );
};

Redirect.getInitialProps = async ctx => ({
  token: ctx.query.token,
});

Redirect.propTypes = {
  token: PropTypes.string,
};

Redirect.defaultProps = {
  token: '',
};

export default Redirect;
