/* eslint-disable no-undef */
import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiCloudUpload, mdiLoading } from '@mdi/js';
import PropTypes from 'prop-types';

import NetWork from '@Utils/network';
import Config from '@Config';

const useStyles = createUseStyles(({
  '@global': {
    '@keyframes loading': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.25)',
    opacity: 0,
    transition: 'all .3s linear',
  },
  root: {
    width: 124,
    height: 124,
    borderRadius: 4,
    border: '1px dashed #929292',
    position: 'relative',
    '&:hover $mask': {
      opacity: 1,
    },
  },
  input: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
  },
  uploadIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#929292',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  delete: {
    width: 48,
    height: 48,
    outline: 'none',
    border: 'none',
    borderRadius: '50%',
    color: '#f5222d',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    '& svg': {
      animation: 'loading 1s linear infinite',
    },
  },
}), {
  name: 'Upload',
});

const Upload = ({ onChange }) => {
  const classes = useStyles();
  const [url, setUrl] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleChange = () => {
    const formData = new FormData();
    const file = fileRef.current.files[0];
    formData.append('image', file);
    setLoading(true);
    NetWork.post(`${Config.apiBaseUrl}/api/v1/tools/upload-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => {
      setUrl(res.get('url'));
      setLoading(false);
      if (onChange) {
        onChange(res.get('path'));
      }
    });
  };

  const handleDel = () => {
    setUrl(undefined);
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div className={classNames(classes.root)}>
      {url ? (
        <>
          <img src={url} alt='file' className={classNames(classes.img)} />
          <div className={classNames(classes.mask)}>
            <button type='button' className={classNames(classes.delete)} onClick={handleDel}>
              <Icon path={mdiTrashCanOutline} size={1} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={classNames(classes.uploadIcon)}>
            <Icon path={mdiCloudUpload} size={2} />
          </div>
          <input
            ref={fileRef}
            type='file'
            accept='image/png, image/jpeg'
            className={classNames(classes.input)}
            onChange={handleChange}
          />
        </>
      )}

      {loading && (
        <span className={classNames(classes.loading)}>
          <Icon path={mdiLoading} size={1} />
        </span>
      )}
    </div>
  );
};

Upload.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Upload;
