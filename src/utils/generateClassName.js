import * as R from 'ramda';
import murmurhash from 'murmurhash';

export default rule => {
  const { key } = rule;
  let prefix = R.pathOr('kls', ['options', 'sheet', 'options', 'classNamePrefix'])(rule);
  prefix = process.env.NODE_ENV !== 'production' ? prefix : 'kls';
  const content = murmurhash.v3(rule.toString());
  return `${prefix}${process.env.NODE_ENV !== 'production' ? key : ''}-${content}`;
};
