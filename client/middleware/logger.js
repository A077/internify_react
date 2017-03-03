/* eslint-disable */
export const logger = () => next => action => {
  //console.log(action)
  return next(action);
}
