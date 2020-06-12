import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const mutilpellipsis = line => ({
  display: '-webkit-box',
  '-webkit-line-clamp': line,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
});

const useStyles = createUseStyles(({
  root: {
    width: '100%',
    display: 'flex',
    transition: 'all .35s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 2px 16px 0px rgba(99,99,99,0.5)',
    },
  },
  directionColumn: {
    flexDirection: 'column',
    '&:hover': {
      boxShadow: '0px 2px 16px 0px rgba(99,99,99,0)',
    },
  },
  top: {
    display: 'none',
  },
  picWrapper: {
    width: '100%',
    height: 0,
    paddingTop: '54.26%',
    position: 'relative',
  },
  pic: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 6,
  },
  content: {
    lineHeight: 1.4,
    color: '#2c2c2c',
  },
  title: {
    fontSize: 20,
    height: 56,
    margin: [20, 0, 10, 0],
    ...mutilpellipsis(2),
  },
  desc: {
    fontSize: 16,
    height: 89.6,
    margin: [10, 0],
    ...mutilpellipsis(4),
  },
  from: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#929292',
  },
  fromUrl: {
    flex: 1,
    padding: [0, 0, 0, '0.5em'],
    ...mutilpellipsis(1),
    color: '#2c2c2c',
  },
  line: {
    height: 16,
    width: 1,
    backgroundColor: '#929292',
    margin: [0, '0.375em', 0, '0.5em'],
  },
}), {
  name: 'Contribute',
});

const Contribute = props => {
  const { data, isColumn } = props;
  const classes = useStyles();
  const createdAt = data.get('created_at');
  const pic = data.get('pic');
  const title = data.get('title');

  return (
    <div
      className={classNames({
        [classes.root]: true,
        [classes.directionColumn]: isColumn,
      })}
    >
      <div className={classes.top}>
        123
      </div>
      <div className={classNames(classes.picWrapper)}>
        <img className={classNames(classes.pic)} src={pic} alt='' />
      </div>
      <div className={classNames(classes.content)}>
        <h3 className={classNames(classes.title)} title={title}>{title}</h3>
        <div className={classNames(classes.from)}>
          <span>From</span>
          <a
            className={classNames(classes.fromUrl)}
            href={data.get('from_url')}
          >
            {data.get('from_url')}
          </a>
          {createdAt && (
            <>
              <span className={classNames(classes.line)} />
              <span>{data.get('created_at')}</span>
            </>
          )}
        </div>
        <p className={classNames(classes.desc)}>{data.get('description')}</p>
        <div>Control</div>
      </div>
    </div>
  );
};

Contribute.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isColumn: PropTypes.bool,
};

Contribute.defaultProps = {
  isColumn: false,
};

export default Contribute;
