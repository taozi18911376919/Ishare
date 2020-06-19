/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import netWork from '@Utils/network';
import Config from '@Config';
import LikeIcon from '@Components/Icon/Like';
import DisLikeIcon from '@Components/Icon/DisLike';

const mutilpellipsis = line => ({
  display: '-webkit-box',
  '-webkit-line-clamp': line,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
});

const useStyles = createUseStyles(({
  '@global': {
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
        top: '50%',
      },
      '50%': {
        opacity: 1,
        top: -10,
      },
      '75%': {
        opacity: 0,
        top: -10,
      },
      '100%': {
        opacity: 0,
        top: '50%',
      },
    },
  },
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
  controls: {
    display: 'flex',
  },
  control: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    lineHeight: 1,
    cursor: 'pointer',
    position: 'relative',
    '& button': {
      backgroundColor: 'transparent',
      outline: 'none',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      padding: 6,
      position: 'relative',
      '&:active svg': {
        transition: 'all .5s linear',
        transform: 'scale(1.5)',
        opacity: 0.75,
      },
    },
    '& + &': {
      marginLeft: 48,
    },
  },
  addAndSubtract: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%)',
    opacity: 0,
  },
  add: {
    extend: 'addAndSubtract',
  },
  subtract: {
    extend: 'addAndSubtract',
  },
  fadeIn: {
    animation: 'fadeIn 1s linear forwards',
  },
  position: {
    position: 'relative',
    top: 3,
  },
  row: {
    padding: [24, 24, 15, 24],
    flexDirection: 'row',
    boxSizing: 'border-box',
    transition: 'all .35s',
    borderRadius: 4,
    '&:hover': {
      boxShadow: '0px 2px 16px 0px rgba(99,99,99,0.5)',
    },
    '& $picWrapper': {
      flexShrink: 0,
      width: 300,
      height: 186,
      paddingTop: 0,
      marginRight: 32,
    },
    '& $title': {
      height: 28,
      margin: 0,
      ...mutilpellipsis(1),
    },
    '& $desc': {
      height: 67.2,
      ...mutilpellipsis(3),
    },
  },
  fromTopicFitness: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 18,
  },
  topicFitness: {
    marginLeft: '10%',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    color: '#1877f2',
  },
  '@media (max-width: 1280px)': {
    fromTopicFitness: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    topicFitness: {
      marginLeft: 0,
      marginTop: 12,
    },
  },
}), {
  name: 'Contribute',
});

const Contribute = props => {
  const { data, isColumn } = props;
  const classes = useStyles();
  const id = data.get('id');
  const createdAt = data.get('created_at');
  const pic = data.get('pic');
  const title = data.get('title');
  const defaultLike = data.get('like');
  const defaultDisLike = data.get('dislike');
  const [like, setLike] = useState(defaultLike);
  const [dislike, setDislike] = useState(defaultDisLike);
  const [add, setAdd] = useState(false);
  const [subtract, setSubtract] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleChangeLike = type => {
    if (disabled) {
      return;
    }
    netWork.post(`${Config.apiBaseUrl}/api/v1/contribute/like-dislike`, {
      contribute_id: id,
      type,
    }).then(res => {
      if (res) {
        if (type === 'LIKE') {
          setAdd(true);
          setLike(res);
        }
        if (type === 'DISLIKE') {
          setSubtract(true);
          setDislike(res);
        }
      }
      setDisabled(true);
    });
  };

  useEffect(() => {
    if (like !== defaultLike) {
      setTimeout(() => {
        setAdd(false);
      }, 1000);
    }
  }, [like]);

  useEffect(() => {
    if (dislike !== defaultDisLike) {
      setTimeout(() => {
        setSubtract(false);
      }, 1000);
    }
  }, [dislike]);

  const createTitle = () => {
    if (!isColumn) {
      return (
        <h3 className={classNames(classes.title)} title={title}>{title}</h3>
      );
    }
    return (
      <a
        href={data.get('from_url')}
        target='_blank'
        rel='noreferrer'
      >
        <h3 className={classNames(classes.title)} title={title}>{title}</h3>
      </a>
    );
  };

  const createFromElement = (
    <div className={classNames(classes.from)}>
      <span>From</span>
      <a
        className={classNames(classes.fromUrl)}
        href={data.get('from_url')}
        target='_blank'
        rel='noreferrer'
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
  );

  const createFromTopicFitnessElement = () => {
    if (!isColumn) {
      return (
        <div className={classNames(classes.fromTopicFitness)}>
          {createFromElement}
          <a className={classNames(classes.topicFitness)}>From TopicFitness</a>
        </div>

      );
    }
    return <></>;
  };


  return (
    <div
      className={classNames({
        [classes.root]: true,
        [classes.row]: !isColumn,
      })}
    >
      <div className={classNames(classes.picWrapper)}>
        <a
          href={data.get('from_url')}
          target='_blank'
          rel='noreferrer'
        >
          <img className={classNames(classes.pic)} src={pic} alt='' />
        </a>
      </div>
      <div className={classNames(classes.content)}>
        {createTitle()}
        {isColumn && createFromElement}
        <p className={classNames(classes.desc)}>{data.get('description')}</p>
        {createFromTopicFitnessElement()}
        <div className={classNames(classes.controls)}>
          <div className={classNames(classes.control)}>
            <button
              type='button'
              className={classNames(classes.control)}
              style={{ color: '#f5222d' }}
              onClick={() => handleChangeLike('LIKE')}
            >
              <span className={classNames({ [classes.add]: true, [classes.fadeIn]: add })}>+1</span>
              <LikeIcon />
            </button>
            <span className={classNames(classes.position)}>{like}</span>
          </div>
          <div className={classNames(classes.control)}>
            <button
              type='button'
              className={classNames(classes.control, classes.position)}
              onClick={() => handleChangeLike('DISLIKE')}
            >
              <span className={classNames({ [classes.subtract]: true, [classes.fadeIn]: subtract })}>-1</span>
              <DisLikeIcon />
            </button>
            <span>-{dislike}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Contribute.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isColumn: PropTypes.bool,
};

Contribute.defaultProps = {
  isColumn: true,
};

export default Contribute;
