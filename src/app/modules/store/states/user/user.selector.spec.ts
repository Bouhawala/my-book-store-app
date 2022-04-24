import { User } from '@auth0/auth0-angular';
import { usersSelector } from './user.selector';

it('selects the current users', () => {
    const users = [newUser(), newUser()];

    const result = usersSelector;

    expect(result).toEqual(users);
});

function newUser(): User {
    return { id: '1', firstname: 'Mohamed', lastname: 'Bouhawala', listOfBooksId: ['1','2'] };
}