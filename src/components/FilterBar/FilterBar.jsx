import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import { BsTrash3, BsBookmarkHeart } from 'react-icons/bs';

import { setFilters, resetFilters } from '../../redux/cars/filtersSlice';
import { getCars, resetCars } from '../../redux/cars/carsSlice';
import css from './FilterBar.module.css';
import axios from 'axios';

const customSelectStyles = {
  control: provided => ({
    ...provided,
    height: 44,
    backgroundColor: '#f7f7f7',
    border: 'none',
    borderRadius: 14,
    paddingLeft: 12,
    boxShadow: 'none',
    cursor: 'pointer',
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: 16,
    color: '#101828',
  }),
  singleValue: provided => ({
    ...provided,
    fontSize: 16,
    fontWeight: 500,
    color: '#101828',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: '#101828',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

const formatMileage = (label, value) => {
  if (!value) return '';
  return `${label} ${Number(value).toLocaleString('en-US')}`;
};

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const [availableBrands, setAvailableBrands] = useState([]);

  const defaultValues = {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  };

  useEffect(() => {
    axios
      .get('https://car-rental-api.goit.global/brands')
      .then(res => setAvailableBrands(res.data))
      .catch(err => console.error('Failed to fetch brands', err));
  }, []);

  const brandOptions = availableBrands.map(brandName => ({
    value: brandName,
    label: brandName,
  }));

  const priceOptions = Array.from({ length: 36 }, (_, i) => {
    const price = (i + 1) * 10;
    return {
      value: price.toString(),
      label: `${price}`,
    };
  });

  const validationSchema = Yup.object().shape({
    brand: Yup.string(),
    rentalPrice: Yup.string(),
    minMileage: Yup.string().matches(/^\d*$/, 'Must be a number').nullable(),
    maxMileage: Yup.string()
      .matches(/^\d*$/, 'Must be a number')
      .nullable()
      .test('is-greater', 'Must be greater than min mileage', function (value) {
        const { minMileage } = this.parent;
        if (!value || !minMileage) return true;
        return Number(value) > Number(minMileage);
      }),
  });

  const handleSubmit = values => {
    const cleanedFilters = Object.entries(values).reduce((acc, [key, val]) => {
      if (val !== '' && val !== null && val !== undefined) {
        acc[key] = val;
      }
      return acc;
    }, {});

    dispatch(resetCars());
    dispatch(setFilters(cleanedFilters));
    dispatch(getCars({ filters: cleanedFilters, page: 1 }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(resetCars());
    dispatch(getCars({ filters: {}, page: 1 }));
  };

  return (
    <div>
      <div className={css.wrapperForm}>
        <Formik
          initialValues={filters || defaultValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form className={css.filterForm}>
              <div className={css.formGroup}>
                <label className={css.formLabel} htmlFor="brand">
                  Car brand
                </label>
                <Select
                  id="brand"
                  name="brand"
                  options={brandOptions}
                  value={
                    brandOptions.find(opt => opt.value === values.brand) ?? null
                  }
                  onChange={option =>
                    setFieldValue('brand', option ? option.value : '')
                  }
                  placeholder="Choose a brand"
                  isClearable
                  classNamePrefix="customSelect"
                  styles={customSelectStyles}
                />
              </div>

              <div className={css.formGroup}>
                <label htmlFor="rentalPrice" className={css.formLabel}>
                  Price / 1 hour
                </label>
                <Select
                  id="rentalPrice"
                  name="rentalPrice"
                  options={priceOptions}
                  value={
                    priceOptions.find(
                      opt => opt.value === values.rentalPrice
                    ) ?? null
                  }
                  onChange={option =>
                    setFieldValue('rentalPrice', option ? option.value : '')
                  }
                  placeholder="Choose a price"
                  isClearable
                  classNamePrefix="customSelect"
                  styles={customSelectStyles}
                />
              </div>

              <div className={css.formGroup}>
                <div className={css.formGroup}>
                  <label htmlFor="minMileage" className={css.formLabel}>
                    Car mileage / km
                  </label>
                  <div className={css.mileageInputs}>
                    <Field name="minMileage">
                      {({ field, form }) => {
                        const rawValue = field.value || '';
                        const numericValue = rawValue.replace(/\D/g, '');
                        const formatted = numericValue
                          ? `From ${Number(numericValue).toLocaleString(
                              'en-US'
                            )}`
                          : '';

                        return (
                          <input
                            type="text"
                            className={css.inputFieldFrom}
                            placeholder="From"
                            value={formatted}
                            onChange={e => {
                              const cleaned = e.target.value.replace(/\D/g, '');
                              form.setFieldValue('minMileage', cleaned);
                            }}
                            inputMode="numeric"
                          />
                        );
                      }}
                    </Field>

                    <Field name="maxMileage">
                      {({ field, form }) => {
                        const rawValue = field.value || '';
                        const numericValue = rawValue.replace(/\D/g, '');
                        const formatted = numericValue
                          ? `To ${Number(numericValue).toLocaleString('en-US')}`
                          : '';

                        return (
                          <input
                            type="text"
                            className={css.inputFieldTo}
                            placeholder="To"
                            value={formatted}
                            onChange={e => {
                              const cleaned = e.target.value.replace(/\D/g, '');
                              form.setFieldValue('maxMileage', cleaned);
                            }}
                            inputMode="numeric"
                          />
                        );
                      }}
                    </Field>
                  </div>
                </div>
              </div>

              <button type="submit" className={css.searchBtn}>
                Search
              </button>

              <button type="button" onClick={handleReset}>
                <BsTrash3 size={18} className={css.btTrash} />
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <NavLink to="/favorites">
            <BsBookmarkHeart size={24} color="#3470ff" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
