import uuid from 'uuid'
import moment from 'moment'

/**
 * @description Generates a current timestamp (now) in unix format
 * @returns {number} Current timestamp in unix format
 */
export const unixTimestamp = () => {
  return +moment()
}

/**
 * @description Generate an id for posts, comments and everything else
 * @returns {string} uuid
 */
export const generateId = () => {
  return uuid()
}
