import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './BookingForm.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  date: Yup.string().required('Required'),
  comment: Yup.string().max(500, 'Max 500 characters'),
});

const BookingForm = () => {
  const handleSubmit = (values, actions) => {
    toast.success('Booked!');
    actions.resetForm();
  };

  return (
    <section className={css.section}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.support}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{ name: '', email: '', date: '', comment: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Name*
            <Field name="name" type="text" className={css.input} />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Email*
            <Field name="email" type="email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Booking date*
            <Field name="date" type="date" className={css.input} />
            <ErrorMessage name="date" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Comment
            <Field
              name="comment"
              as="textarea"
              rows="4"
              className={`${css.input} ${css.textarea}`}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={css.error}
            />
          </label>

          <button type="submit" className={css.button}>
            Send
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default BookingForm;
