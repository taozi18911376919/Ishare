import React from 'react';
import { Link } from '@Server/routes';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useRouter } from 'next/router';

import SearchTopic from '@Components/Search/Topics';
import SearchContribute from '@Components/Search/Contribute';

const useStyles = createUseStyles(({
  tab: {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
  },
  tabItem: {
    fontSize: '18',
    cursor: 'pointer',
    padding: [8, 24],
    position: 'relative',
  },
  active: {
    color: '#85a5ff',
    '&:before': {
      content: '""',
      width: '100%',
      height: 2,
      backgroundColor: '#85a5ff',
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
  },
}), {
  name: 'SearchPage',
});

const SearchPage = () => {
  const classes = useStyles();
  const { query: { pageType } } = useRouter();

  return (
    <>
      <ul className={classNames(classes.tab)}>
        <Link route='/search/topics'>
          <li className={classNames({ [classes.tabItem]: true, [classes.active]: pageType === 'topics' })}>Topic</li>
        </Link>
        <Link route='/search'>
          <li className={classNames({ [classes.tabItem]: true, [classes.active]: !pageType })}>Share</li>
        </Link>
      </ul>
      { pageType === 'topics' ? <SearchTopic /> : <SearchContribute />}
    </>
  );
};

export default SearchPage;
