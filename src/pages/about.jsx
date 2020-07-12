/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';

import css from '@Assets/sass/custom.sass';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    padding: [32, 0],
  },
}, {
  name: 'AboutPage',
});

const AboutPage = () => {
  const classes = useStyles();
  return (
    <div className={classNames(css.container, classes.root)}>
      <p className={classNames(css.subtitle, css['is-6'])}>
        The premium platform you will ever need for your content marketing and Social media management.
      </p>
      <p className={classNames(css.subtitle, css['is-6'])}>
        Digital content is growing at an exponential rate. Millions of pieces of content are being created every minute from videos, articles, documents, images, social posts, etc. We believe that sharing this information should be flexible, informative and contextual, depending on who the audience is. At Topixin, we’re driven to leverage technology to help everyone share online content in an intelligent and meaningful way.
      </p>
      <p className={classNames(css.subtitle, css['is-6'])}>
        All companies, businesses, and brands rely on creating, distributing and promoting trending content in their industry to keep their audience engaged and educated. Topixin is exactly that for all your content related needs. Whether it be content discovery, composing, planning, automation, amplification or insights, We have got you covered. We help marketing and sales professionals deepen relationships with their audiences and drive revenue through strategically curated content.
      </p>
      <p className={classNames(css.subtitle, css['is-6'])}>
        We are an international team of passionate professionals who are committed to those that believe that great relationships are built on trust–and that trust is formed by providing valuable content
      </p>
    </div>
  );
};

export default AboutPage;
