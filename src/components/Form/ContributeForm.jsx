import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import ReactSelect from 'react-select';
import { useFormik } from 'formik';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import Icon from '@mdi/react';
import { mdiLoading, mdiClose } from '@mdi/js';
import Upload from '@Components/Base/Upload';

import CategoryAction from '@Actions/category';
import AddAction from '@Actions/add';
import UiAction from '@Actions/ui';


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
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    position: 'relative',
    width: 800,
    maxHeight: '70%',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    boxShadow: '0 0 32px 0 rgba(0, 0, 0, 0.5)',
    padding: [68, 68, 24, 48],
    overflowY: 'auto',
  },
  field: {
    display: 'flex',
    marginBottom: 24,
  },
  label: {
    width: 148,
    fontSize: 18,
    textAlign: 'right',
    marginRight: 16,
    color: '#929292',
  },
  input: {
    outline: 'none',
    border: '1px solid #929292',
    height: 48,
    borderRadius: 4,
    padding: 16,
    boxSizing: 'border-box',
    fontSize: 14,
    color: '#929292',
    flex: 1,
    '&:focus, &:not(:disabled):hover': {
      borderColor: '#1877f2',
    },
  },
  textarea: {
    height: 96,
    resize: 'none',
  },
  error: {
    fontSize: 14,
    lineHeight: 1.25,
    color: '#f5222d',
    paddingLeft: 164,
  },
  submit: {
    flex: 1,
    outline: 'none',
    border: '2px solid #1877f2',
    borderRadius: 4,
    height: 48,
    backgroundColor: '#1877f2',
    fontSize: 16,
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all .3s',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#1877f2',
    },
    '&:disabled': {
      pointerEvents: 'none',
      '& span:nth-child(1)': {
        opacity: 0,
      },
    },
  },
  loading: {
    position: 'absolute',
    left: -2,
    top: -2,
    right: -2,
    bottom: -2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    '& svg': {
      animation: 'loading 1s linear infinite',
    },
  },
  close: {
    position: 'absolute',
    right: 12,
    top: 12,
    outline: 'none',
    padding: 8,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
}), {
  name: 'ContributeForm',
});

const ContributeForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [topicOptions, setTopicOptions] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState(null);
  const router = useRouter();

  const { categorys, topics } = useSelector(state => ({
    categorys: state.getIn(['category', 'categorys']),
    topics: state.getIn(['category', 'topics']),
  }), shallowEqual);

  useEffect(() => {
    dispatch(CategoryAction.fetchCategory());
    dispatch(CategoryAction.fetchTopic());
  }, []);

  useEffect(() => {
    if (topics.size) {
      const tempTopics = [];
      topics.map(item => (
        tempTopics.push({
          value: item.get('id'),
          label: item.get('title'),
        })
      ));
      setTopicOptions(tempTopics);
    }
  }, [topics]);

  useEffect(() => {
    if (categorys) {
      const tempCategorys = [];
      categorys.map(item => (
        tempCategorys.push({
          value: item.get('id'),
          label: item.get('name'),
        })
      ));
      setCategoryOptions(tempCategorys);
    }
  }, [categorys]);

  const customStyle = {
    control: styles => ({ ...styles, minHeight: 48 }),
  };

  const {
    values,
    handleSubmit,
    handleChange,
    isSubmitting,
    errors: formikErrors,
    submitCount,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: '',
      description: '',
      pic: '',
      topic_id: router.pathname === '/topics' ? router.query.id : '',
      categorys: '',
      from_url: '',
    },
    onSubmit: (formData, formikBag) => {
      dispatch(AddAction.addContribute(formData, formikBag));
    },
    displayName: 'ContributeForm',
  });

  const showError = field => {
    if (formikErrors && formikErrors[field] && submitCount) {
      return (
        <p className={classNames(classes.error)}>{formikErrors[field]}</p>
      );
    }
    return null;
  };

  const handleChangePic = path => {
    setFieldValue('pic', path);
  };

  const handleChangeTopic = data => {
    setFieldValue('topic_id', data.value);
  };

  const handleChangeCateGorys = data => {
    const temp = data.map(item => item.value);
    setFieldValue('categorys', temp);
  };

  const handleClose = () => {
    dispatch(UiAction.closeModal());
  };

  return (
    <div className={classNames(classes.root)}>
      <div className={classNames(classes.content)}>
        <button type='button' className={classNames(classes.close)}>
          <Icon path={mdiClose} size={1} onClick={handleClose} />
        </button>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <div className={classNames(classes.field)}>
            <span className={classNames(classes.label)}>Title:</span>
            <input
              name='title'
              value={values.title}
              className={classNames(classes.input)}
              autoComplete='off'
              onChange={handleChange}
            />
          </div>
          {showError('title')}
          <div className={classNames(classes.field)}>
            <span className={classNames(classes.label)}>Description:</span>
            <textarea
              name='description'
              value={values.description}
              className={classNames(classes.input, classes.textarea)}
              onChange={handleChange}
            />
          </div>
          {showError('description')}
          <div className={classNames(classes.field)}>
            <span className={classNames(classes.label)}>Pic:</span>
            <Upload onChange={handleChangePic} />
          </div>
          {showError('pic')}
          <div className={classNames(classes.field)}>
            <span className={classNames(classes.label)}>Topic:</span>
            <div style={{ flex: 1 }}>
              {topicOptions && (
                <ReactSelect
                  defaultValue={topicOptions.find(option => option.value === +values.topic_id)}
                  isDisabled={router.pathname === '/topics'}
                  options={topicOptions}
                  styles={customStyle}
                  placeholder='Topic'
                  onChange={handleChangeTopic}
                />
              )}
            </div>
          </div>
          {showError('topic_id')}
          <div className={classNames(classes.field)}>
            <span className={classNames(classes.label)}>Categorys:</span>
            <div style={{ flex: 1 }}>
              {categoryOptions && (
                <ReactSelect
                  isMulti
                  options={categoryOptions}
                  styles={customStyle}
                  placeholder='Categorys'
                  onChange={handleChangeCateGorys}
                />
              )}
            </div>
          </div>
          {showError('categorys')}
          <div className={classNames(classes.field)}>
            <span className={classNames(classes.label)}>From Url:</span>
            <input
              name='from_url'
              className={classNames(classes.input)}
              autoComplete='off'
              onChange={handleChange}
            />
          </div>
          {showError('from_url')}
          <div className={classNames(classes.field)}>
            <span className={classNames(classes.label)}>  </span>
            <button type='submit' disabled={isSubmitting} className={classNames(classes.submit)}>
              <span>Add Contribute</span>
              {isSubmitting && (
                <span className={classNames(classes.loading)}>
                  <Icon path={mdiLoading} size={1} />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContributeForm;
