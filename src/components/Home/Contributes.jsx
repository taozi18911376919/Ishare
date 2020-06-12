import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import ModuleTilt from '@Componnents/Base/ModuleTitle';
import ContributeWrapper from '@Componnents/Base/ContributeWrapper';

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
        Lastest Contribute
        {categoryName && <small>{categoryName}</small>}
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
