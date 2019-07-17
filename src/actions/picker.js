export const CHANGE_SELECTED = 'CHANGE_SELECTED';

export const changeSelected = (value) => (dispatch, getState) => {
  const state = getState();
  // check that option is valid before changing state
  if (state.value !== value) {
    dispatch(changeSelectedUnsafe(value));
  };
};

export const changeSelectedUnsafe = (value) => {
  return {
    type: CHANGE_SELECTED,
    value
  };
}
