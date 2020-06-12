import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import Topic from '@Componnents/Base/Topic';

const useStyles = createUseStyles(({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  item: {
    width: '32%',
    display: 'flex',
    flexDirection: 'column',
  },
  topicWrapper: {
    flex: 1,
    '& + &': {
      marginTop: 24,
    },
  },
  center: {
    width: '26%',
    height: 0,
    paddingTop: '34.88%',
    position: 'relative',
  },
  centerInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
  },
}), {
  name: 'TopicWrapper',
});

const TopicWrapper = props => {
  const { data } = props;
  const classes = useStyles();

  const createTopicElement = topicIndex => {
    const topicData = data.get(topicIndex);
    if (topicData) {
      return <Topic data={topicData} />;
    }
    return <></>;
  };

  return (
    <div className={classNames(classes.root)}>
      <div className={classNames(classes.item)}>
        <div className={classNames(classes.topicWrapper)}>
          {createTopicElement(0)}
        </div>
        <div className={classNames(classes.topicWrapper)}>
          {createTopicElement(1)}
        </div>
      </div>
      <div className={classNames(classes.item, classes.center)}>
        <div className={classNames(classes.centerInner)}>
          <div className={classNames(classes.topicWrapper)}>
            {createTopicElement(2)}
          </div>
        </div>
      </div>
      <div className={classNames(classes.item)}>
        <div className={classNames(classes.topicWrapper)}>
          {createTopicElement(3)}
        </div>
        <div className={classNames(classes.topicWrapper)}>
          {createTopicElement(4)}
        </div>
      </div>
    </div>
  );
};

TopicWrapper.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default TopicWrapper;
