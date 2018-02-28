export const OPEN_DIALOG = 'OPEN_DIALOG'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'

/**
 * @description Dispatch an action to open dialog
 * @returns {object} action - The action type
 */
export const openDialog = () => {
  return dispatch => {
    dispatch({ type: OPEN_DIALOG })
  }
}

/**
 * @description Dispatch an action to close dialog
 * @returns {object} action - The action type
 */
export const closeDialog = () => {
  return dispatch => {
    dispatch({ type: CLOSE_DIALOG })
  }
}
