import * as Actions from './user.action';

  it('SHOULD create a setSelectedUserIdAction action containing a payload', () => {
    const payload = { id: 1 };
    const action = new (Actions.setSelectedUserIdAction(payload) as any);

    expect({ ...action }).toEqual({
      type: Actions.setSelectedUserIdAction,
      payload
    });
  });
