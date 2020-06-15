import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from '@Server/routes';


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
    flexDirection: 'column',
    cursor: 'pointer',
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
}), {
  name: 'Recommend',
});

const Recommend = props => {
  const { data, isShowDesc } = props;
  const classes = useStyles();
  const id = data.get('id');
  const pic = data.get('pic');
  const title = data.get('title');

  return (
    <Link route={`/topics/${id}`}>
      <div className={classNames(classes.root)}>
        <div className={classNames(classes.picWrapper)}>
          <img className={classNames(classes.pic)} src={pic} alt='' />
        </div>
        <div className={classNames(classes.content)}>
          <h3 className={classNames(classes.title)} title={title}>{title}</h3>
          {isShowDesc && <p className={classNames(classes.desc)}>{data.get('description')}</p>}
        </div>
      </div>
    </Link>
  );
};

Recommend.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isShowDesc: PropTypes.bool,
};

Recommend.defaultProps = {
  isShowDesc: false,
};

export default Recommend;
