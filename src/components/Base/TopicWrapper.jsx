import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import css from '@Assets/sass/custom.sass';

import Topic from '@Components/Base/Topic';

const useStyles = createUseStyles(({
  columns: {
    flexWrap: 'wrap',
  },
  column: {
    paddingTop: '50%',
    position: 'relative',
  },
  topicWrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
    bottom: 12,
    left: 12,
  },
  '@media screen and (min-width: 769px)': {
    column: {
      paddingTop: '24%',
    },
  },
  '@media screen and (min-width: 1024px)': {
    column: {
      paddingTop: '18%',
    },
  },
}), {
  name: 'TopicWrapper',
});

const TopicWrapper = props => {
  const { data } = props;
  const classes = useStyles();

  return (
    <>
      <div className={classNames(css.columns, classes.columns)}>
        {data.map(item => (
          <div
            className={classNames(css.column, css['is-one-third-desktop'], css['is-half-tablet'], classes.column)}
            key={item.get('title')}
          >
            <div className={classNames(classes.topicWrapper)}>
              <Topic data={item} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

TopicWrapper.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default TopicWrapper;
