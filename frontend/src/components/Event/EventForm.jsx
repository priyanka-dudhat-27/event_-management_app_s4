/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
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

// EventForm component
const EventForm = ({ open, onClose, onSubmit }) => {
  const initialValues = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: ''
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
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
                <Field type="text" name="title" className="w-full px-4 py-2 mt-1 border rounded-md" />
                <ErrorMessage name="title" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <Field as="textarea" name="description" className="w-full px-4 py-2 mt-1 border rounded-md" rows="3" />
                <ErrorMessage name="description" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <Field type="date" name="date" className="w-full px-4 py-2 mt-1 border rounded-md" />
                <ErrorMessage name="date" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time</label>
                <Field type="time" name="time" className="w-full px-4 py-2 mt-1 border rounded-md" />
                <ErrorMessage name="time" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <Field type="text" name="location" className="w-full px-4 py-2 mt-1 border rounded-md" />
                <ErrorMessage name="location" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <Field type="text" name="image" className="w-full px-4 py-2 mt-1 border rounded-md" />
                <ErrorMessage name="image" component="div" className="text-red-600" />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="secondary">Cancel</Button>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                Create
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

// PropTypes for type checking
EventForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EventForm;
