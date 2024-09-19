/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
  location: Yup.string().required('Location is required'),
  image: Yup.string().url('Invalid URL')
});

// EventForm component with form handling
const EventForm = ({ open, onClose, onSubmit, eventData }) => {
  const initialValues = eventData || {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: ''
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{eventData ? 'Edit Event' : 'Create Event'}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogContent>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="title" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                  rows="3"
                />
                <ErrorMessage name="description" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <Field
                  type="date"
                  name="date"
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="date" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time</label>
                <Field
                  type="time"
                  name="time"
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="time" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <Field
                  type="text"
                  name="location"
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="location" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <Field
                  type="text"
                  name="image"
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="image" component="div" className="text-red-600" />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {eventData ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

// Adding PropTypes for type checking
EventForm.propTypes = {
  open: PropTypes.bool.isRequired, // Ensure open is a boolean and is required
  onClose: PropTypes.func.isRequired, // Ensure onClose is a function and is required
  onSubmit: PropTypes.func.isRequired, // Ensure onSubmit is a function and is required
  eventData: PropTypes.shape({ // Define shape of eventData object
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
  })
};

// Set default values for eventData prop
EventForm.defaultProps = {
  eventData: null, // Default value for eventData if not passed
};

export default EventForm;
