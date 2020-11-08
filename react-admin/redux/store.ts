import { combineReducers, createStore } from 'redux';
import { IUser } from '../Types';
import { user_reducer } from './user/reducers';

const root_reducer = combineReducers({
    user: user_reducer,
});

export const store = createStore(root_reducer);

export interface IStore {
    user: IUser;
}
