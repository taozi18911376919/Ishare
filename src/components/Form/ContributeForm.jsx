import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import ReactSelect from 'react-select';
import { useFormik } from 'formik';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';

import css from '@Assets/sass/custom.sass';

import CategoryAction from '@Actions/category';
import AddAction from '@Actions/add';
import Upload from '@Components/Base/Upload';


const useStyles = createUseStyles({
  label: {
    textAlign: 'left',
    marginBottom: 8,
  },
}, {
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
    touched,
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
    if (touched[field] && formikErrors[field]) {
      return (
        <p className={classNames(css.help, css['is-danger'])}>{formikErrors[field]}</p>
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
    const temp = data && data.map(item => item.value);
    setFieldValue('categorys', temp);
  };

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <div className={classNames(css.field)}>
        <div className={classNames(css['field-label'], css['is-normal'])}>
          <label className={classNames(css.label, classes.label)}>Title:</label>
        </div>
        <div className={classNames(css['field-body'])}>
          <div className={classNames(css.field)}>
            <div className={classNames(css.control)}>
              <input
                className={classNames(css.input, css['is-medium'])}
                name='title'
                value={values.title}
                autoComplete='off'
                onChange={handleChange}
              />
            </div>
            {showError('title')}
          </div>
        </div>
      </div>
      <div className={classNames(css.field)}>
        <div className={classNames(css['field-label'], css['is-normal'])}>
          <label className={classNames(css.label, classes.label)}>Topic:</label>
        </div>
        <div className={classNames(css['field-body'])}>
          <div className={classNames(css.field)}>
            <div className={classNames(css.control)}>
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
            {showError('topic_id')}
          </div>
        </div>
      </div>
      <div className={classNames(css.field)}>
        <div className={classNames(css['field-label'], css['is-normal'])}>
          <label className={classNames(css.label, classes.label)}>Categorys:</label>
        </div>
        <div className={classNames(css['field-body'])}>
          <div className={classNames(css.field)}>
            <div className={classNames(css.control)}>
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
            {showError('categorys')}
          </div>
        </div>
      </div>
      <div className={classNames(css.field)}>
        <div className={classNames(css['field-label'], css['is-normal'])}>
          <label className={classNames(css.label, classes.label)}>Description:</label>
        </div>
        <div className={classNames(css['field-body'])}>
          <div className={classNames(css.field)}>
            <div className={classNames(css.control)}>
              <textarea
                className={classNames(css.textarea, css['is-medium'])}
                name='description'
                value={values.description}
                autoComplete='off'
                onChange={handleChange}
              />
            </div>
            {showError('description')}
          </div>
        </div>
      </div>
      <div className={classNames(css.field)}>
        <div className={classNames(css['field-label'], css['is-normal'])}>
          <label className={classNames(css.label, classes.label)}>Pic:</label>
        </div>
        <div className={classNames(css['field-body'])}>
          <div className={classNames(css.field)}>
            <div className={classNames(css.control)}>
              <Upload onChange={handleChangePic} />
            </div>
            {showError('pic')}
          </div>
        </div>
      </div>
      <div className={classNames(css.field)}>
        <div className={classNames(css['field-label'], css['is-normal'])}>
          <label className={classNames(css.label, classes.label)}>From Url:</label>
        </div>
        <div className={classNames(css['field-body'])}>
          <div className={classNames(css.field)}>
            <div className={classNames(css.control)}>
              <input
                className={classNames(css.input, css['is-medium'])}
                name='from_url'
                autoComplete='off'
                value={values.from_url}
                onChange={handleChange}
              />
            </div>
            {showError('title')}
          </div>
        </div>
      </div>
      <div className={classNames(css.field)}>
        <div className={classNames(css['field-label'], css['is-normal'])}>
          <label className={classNames(css.label, classes.label)} />
        </div>
        <div className={classNames(css['field-body'])}>
          <div className={classNames(css.field)}>
            <div className={classNames(css.control)}>
              <button
                type='submit'
                className={classNames({
                  [css.button]: true,
                  [css['is-fullwidth']]: true,
                  [css['is-medium']]: true,
                  [css['is-primary']]: true,
                  [css['is-rounded']]: true,
                  [css['is-loading']]: isSubmitting,
                })}
              >
                Add Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContributeForm;
