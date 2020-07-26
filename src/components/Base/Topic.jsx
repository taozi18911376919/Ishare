import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(({

  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 6,
    overflow: 'hidden',
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0)',
    transition: 'all .35s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 2px 16px 0px rgba(99,99,99,0.5)',
    },
  },
  pic: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: [8, 16],
    backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.68) 100%)',
    color: '#ffffff',
    lineHeight: 1.4,
    textShadow: '1px 1px 0px rgba(0,0,0,.5)',
  },
  mutilpellipsis: {
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  title: {
    margin: 0,
    fontSize: 18,
    extend: 'mutilpellipsis',
  },
  description: {
    margin: 0,
    fontSize: 14,
    extend: 'mutilpellipsis',
  },
}), {
  name: 'Topic',
});

const Topic = ({ data }) => {
  const classes = useStyles();
  const slug = data.get('slug');
  const title = data.get('title');
  const description = data.get('description');
  const pic = data.get('pic');
  return (
    <a href={`/topics/${slug}`} rel='noopener noreferrer'>
      <div className={classNames(classes.root)}>
        <img
          className={classNames(classes.pic)}
          src={pic}
          alt=''
        />
        <div className={classNames(classes.content)}>
          <h3 className={classNames(classes.title)}>{title}</h3>
          <p className={classes.description}>{description}</p>
        </div>
      </div>
    </a>
  );
};

Topic.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};


export default Topic;
