// 
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import { lg } from '~/theme/variables'

// Neded for solving a fix in Windows browsers
const overflowStyle = {
  overflow: 'hidden',
  width: '100%',
}

const styles = () => ({
  root: {
    paddingTop: lg,
    paddingBottom: '12px',
    lineHeight: 0,
  },
})

class TextField extends React.PureComponent {
  render() {
    const {
      classes,
      input: { name, onChange, value, ...restInput },
      inputAdornment,
      meta,
      multiline,
      rows,
      testId,
      text,
      ...rest
    } = this.props
    const helperText = value ? text : undefined
    const showError = (meta.touched || !meta.pristine) && !meta.valid
    const isInactiveAndPristineOrUntouched = !meta.active && (meta.pristine || !meta.touched)
    const isInvalidAndUntouched = typeof meta.error === 'undefined' ? true : !meta.touched

    const disableUnderline = isInactiveAndPristineOrUntouched && isInvalidAndUntouched

    const inputRoot = helperText ? classes.root : ''
    const statusClasses = meta.valid ? 'isValid' : meta.error && (meta.dirty || meta.touched) ? 'isInvalid' : ''
    const inputProps = {
      ...restInput,
      autoComplete: 'off',
      'data-testid': testId,
    }
    const inputRootProps = {
      ...inputAdornment,
      className: `${inputRoot} ${statusClasses}`,
      disableUnderline: disableUnderline,
    }

    return (
      <MuiTextField
        error={meta.error && (meta.touched || !meta.pristine)}
        helperText={showError ? meta.error : helperText || ' '}
        inputProps={inputProps} // blank in order to force to have helper text
        InputProps={inputRootProps}
        multiline={multiline}
        name={name}
        onChange={onChange}
        rows={rows}
        style={overflowStyle}
        value={value}
        {...rest}
      />
    )
  }
}

export default withStyles(styles)(TextField)
