import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import fakeData from './fake-datas.json';

export type State = {
  counter: number,
  pictures: Picture[];
  pictureSelected:Picture | null,
}

export const defaultState: State = {
  counter: 0,
  pictures: [],
  pictureSelected: null,
}

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1,
        pictures: fakeData.slice(0, state.counter + 1)
      };
    case 'DECREMENT':
      return { ...state, counter: Math.max(3, state.counter - 1),
        pictures: fakeData.slice(0, Math.max(3, state.counter - 1)),
       };
    case 'SELECT_PICTURE':
      return { ...state, pictureSelected: action.picture };
    case 'CLOSE_MODAL':
      return { ...state, pictureSelected: null };
    case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';
  }
};

export const counterSelector = (state: State) => state.counter;

export const picturesSelector = (state: State) => state.pictures;

export const getSelectedPicture = (state: State) => state.pictureSelected;

export default compose(liftState, reducer);
