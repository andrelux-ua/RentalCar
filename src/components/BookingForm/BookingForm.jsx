// BookingForm.jsx — з інтеграцією react-datepicker та повною відповідністю стилю
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const initialFormValues = {
    name: '',
    email: '',
    comment: '',
  };

  const formValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    comment: Yup.string().max(500, 'Maximum 500 characters'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date'),
  });

  const handleFormSubmit = (formData, { resetForm }) => {
    const bookingInfo = {
      ...formData,
      startDate,
      endDate,
    };
    console.log('Booking submission:', bookingInfo);
    toast.success('Booking confirmed!');
    resetForm();
    setStartDate(null);
    setEndDate(null);
  };

  // Функція для отримання мінімальної дати (сьогодні)
  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  // Функція для отримання мінімальної дати кінця (після початкової дати)
  const getMinEndDate = () => {
    if (!startDate) return getMinDate();
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };

  return (
    <div className={styles.bookingFormContainer}>
      <h2 className={styles.formTitle}>Book your car now</h2>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialFormValues}
        validationSchema={formValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <label htmlFor="name">
              <Field
                type="text"
                name="name"
                placeholder="Name*"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorText}
              />
            </label>

            <label htmlFor="email">
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorText}
              />
            </label>

            <div className={styles.dateContainer}>
              <label htmlFor="startDate">
                <span className={styles.dateLabel}>Start Date*</span>
                <DatePicker
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date);
                    setFieldValue('startDate', date);
                    // Скидаємо кінцеву дату якщо вона раніше нової початкової
                    if (endDate && date && endDate <= date) {
                      setEndDate(null);
                      setFieldValue('endDate', null);
                    }
                  }}
                  className={styles.input}
                  placeholderText="Select start date"
                  dateFormat="yyyy-MM-dd"
                  name="startDate"
                  minDate={getMinDate()}
                  filterDate={date => date >= getMinDate()}
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className={styles.errorText}
                />
              </label>

              <label htmlFor="endDate">
                <span className={styles.dateLabel}>End Date*</span>
                <DatePicker
                  selected={endDate}
                  onChange={date => {
                    setEndDate(date);
                    setFieldValue('endDate', date);
                  }}
                  className={styles.input}
                  placeholderText="Select end date"
                  dateFormat="yyyy-MM-dd"
                  name="endDate"
                  minDate={getMinEndDate()}
                  filterDate={date => date >= getMinEndDate()}
                  disabled={!startDate}
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className={styles.errorText}
                />
              </label>
            </div>

            <label htmlFor="comment">
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={`${styles.input} ${styles.textarea}`}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={styles.errorText}
              />
            </label>

            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
