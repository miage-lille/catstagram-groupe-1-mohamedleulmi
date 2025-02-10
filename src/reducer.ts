import { Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import { cmdFetch } from './commands';
import { failure, loading, success } from './api';
import { Failure, Loading, Success } from './types/api.type';

export type State = {
  counter: number,
  pictures: Loading | Success | Failure,
  pictureSelected: Picture | null,
}
export const defaultState: State = {
  counter: 0,
  pictures: { kind: 'LOADING' },
  pictureSelected: null,
}

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return loop(
        { ...state, counter: state.counter + 1 },
        cmdFetch({ type: 'FETCH_CATS_REQUEST', method: 'GET', path: `https://pixabay.com/api/?key=48755666-c781ff30a330432a20d18f4d5&per_page=${state.counter + 1}&q=cat` })
      );
    case 'DECREMENT':
      return loop(
        { ...state, counter: Math.max(3, state.counter - 1) },
        cmdFetch({ type: 'FETCH_CATS_REQUEST', method: 'GET', path: `https://pixabay.com/api/?key=48755666-c781ff30a330432a20d18f4d5&per_page=${Math.max(3, state.counter - 1)}&q=cat` })
      );
    case 'SELECT_PICTURE':
      return { ...state, pictureSelected: action.picture };
    case 'CLOSE_MODAL':
      return { ...state, pictureSelected: null };
    case 'FETCH_CATS_REQUEST':
      return { ...state, pictures: loading() };
    case 'FETCH_CATS_COMMIT':
      return { ...state, pictures: success(action.payload) };
    case 'FETCH_CATS_ROLLBACK':
      return { ...state, pictures: failure(action.error.message) };
  }
};

export const counterSelector = (state: State) => state.counter;

export const picturesSelector = (state: State) => state.pictures;

export const getSelectedPicture = (state: State) => state.pictureSelected;

export default compose(liftState, reducer);
