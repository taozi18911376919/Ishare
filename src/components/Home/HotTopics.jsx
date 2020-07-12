import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';

import css from '@Assets/sass/custom.sass';
import ModuleTilt from '@Components/Base/ModuleTitle';
import TopicWrapper from '@Components/Base/TopicWrapper';

const HotTopics = props => {
  const { data, categoryId } = props;
  const [categoryName, setCategoryName] = useState(undefined);
  const categorys = useSelector(state => state.getIn(['home', 'data', 'category']), shallowEqual);

  useEffect(() => {
    if (categoryId) {
      categorys.forEach(item => {
        if (item.get('id') === categoryId) {
          setCategoryName(item.get('name'));
        }
      });
    } else {
      setCategoryName(undefined);
    }
  }, [categoryId]);

  return (
    <>
      <ModuleTilt color>
        Hot Topics
        {categoryName && (
          <span
            className={classNames(css.button, css['is-small'], css['is-light'], css['is-rounded'], css['is-disabled'])}
            style={{ marginLeft: 4 }}
          >
            #{categoryName}
          </span>
        )}
      </ModuleTilt>
      <TopicWrapper data={data} />
    </>
  );
};

HotTopics.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default HotTopics;
