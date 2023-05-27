import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authors from './authors/slice';
import courses from './courses/slice';
import user from './user/slice';

const rootReducer = combineReducers({ authors, courses, user });

export const store = configureStore({
	reducer: rootReducer,
});
