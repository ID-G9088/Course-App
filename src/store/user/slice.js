import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpRequestService } from '../../services';

const { getUserRequest } = httpRequestService();

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	(token, { rejectWithValue }) => {
		return getUserRequest(token)
			.then(
				({
					data: {
						result: { role, name, email },
					},
				}) => ({ isAuth: true, name: name || 'unknown', email, role, token })
			)
			.catch((error) => rejectWithValue(error.response.data));
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			Object.assign(state, action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.fulfilled, (state, action) => {
				Object.assign(state, action.payload);
			})
			.addCase(fetchUser.rejected, (state, action) => {
				console.log(action.payload);
			});
	},
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
