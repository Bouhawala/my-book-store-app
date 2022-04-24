import * as fromReducer from './user.reducer';
import * as fromActions from './user.action';

describe('Store > User > UserReducer', () => {
  afterEach(() => {
    fromReducer.initialUserState.entities = [];
  });

  it('SHOULD return the default state', () => {
    const { initialUserState } = fromReducer;
    const state = fromReducer.userReducer(undefined, { type: '' });

    expect(state).toBe(initialUserState);
  });

});