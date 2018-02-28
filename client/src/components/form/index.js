import React from 'react'
import TextField from 'material-ui/TextField'

/**
 * @description Material-UI component to integrate with redux-form
 * @param {any} {
 *   id,
 *   input,
 *   label,
 *   meta: {
 *     touched,
 *     error
 *   },
 *   ...custom
 * }
 * @returns {component} TextField - A text field to support redux-form
 */
export const reduxTextField = ({
  id,
  input,
  label,
  meta: {
    touched,
    error
  },
  ...custom
}) => (
  <TextField
    id={id}
    label={label}
    fullWidth
    error={touched && error ? true : false}
    helperText={touched && error}
    {...input}
    {...custom}
    margin="normal"
  />
)

/**
 * @description Material-UI component to integrate with redux-form
 * @param {any} {
 *   id,
 *   input,
 *   label,
 *   children,
 *   meta: {
 *     touched,
 *     error
 *   },
 *   ...custom
 * }
 * @returns {component} SelectField - A select field to support redux-form
 */
export const reduxSelectField = ({
  id,
  input,
  label,
  children,
  meta: {
    touched,
    error
  },
  ...custom
}) => (
  <TextField
    select
    id={id}
    label={label}
    fullWidth
    error={touched && error ? true : false}
    helperText={touched && error}
    {...input}
    onBlur={() => input.onBlur(input.value)}
    onChange={(value) => input.onChange(value)}
    children={children}
    {...custom}
    margin="normal"
  />
)
