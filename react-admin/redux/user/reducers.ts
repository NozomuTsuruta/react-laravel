import { IUser } from '../../Types';

const initial_state = {};

export const user_reducer = (
    state = initial_state,
    action: { type: string; user: IUser }
) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};
