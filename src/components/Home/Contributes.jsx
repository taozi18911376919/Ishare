import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';

import css from '@Assets/sass/custom.sass';

import ModuleTilt from '@Components/Base/ModuleTitle';
import ContributeWrapper from '@Components/Base/ContributeWrapper';

import ContributeIcon from '@Components/Icon/Contribute';


const Contributes = props => {
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
      <ModuleTilt>
        {/* eslint-disable-next-line max-len */}
        <span style={{ color: '#FFD666', marginRight: 8 }}><ContributeIcon /></span>
        Latest Shares
        {categoryName && (
          <span
            className={classNames(css.button, css['is-small'], css['is-light'], css['is-rounded'], css['is-disabled'])}
            style={{ marginLeft: 4 }}
          >
            #{categoryName}
          </span>
        )}
      </ModuleTilt>
      <ContributeWrapper data={data} />
    </>
  );
};

Contributes.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default Contributes;
