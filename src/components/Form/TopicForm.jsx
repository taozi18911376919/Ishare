import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ReactSelect from 'react-select';
import { useFormik } from 'formik';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createUseStyles } from 'react-jss';

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
  name: 'TopicForm',
});

const TopicForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [categoryOptions, setCategoryOptions] = useState(null);

  const { categorys } = useSelector(state => ({
    categorys: state.getIn(['category', 'categorys']),
  }), shallowEqual);

  useEffect(() => {
    dispatch(CategoryAction.fetchCategory());
  }, []);

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
      categorys: '',
    },
    validate: formData => {
      const error = {};
      if (!formData.title) {
        error.title = 'The title field is required.';
      }
      if (!formData.description) {
        error.description = 'The description field is required.';
      }
      if (!formData.pic) {
        error.pic = 'The pic field is required.';
      }
      if (!formData.categorys) {
        error.categorys = 'The categorys field is required.';
      }
      return error;
    },
    onSubmit: (formData, formikBag) => {
      dispatch(AddAction.addTopic(formData, formikBag));
    },
    displayName: 'TopicForm',
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
                Add Topic
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TopicForm;
