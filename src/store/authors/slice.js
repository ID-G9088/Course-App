import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpRequestService } from '../../services';

const { getAllAuthorsRequest, addAuthorRequest } = httpRequestService();

const initialState = [];

export const getAllAuthors = createAsyncThunk(
	'authors/getAllAuthors',
	(_, { rejectWithValue }) => {
		return getAllAuthorsRequest()
			.then(({ data: { result } }) => result)
			.catch((error) => rejectWithValue(error.response.data));
	}
);

export const addAuthor = createAsyncThunk(
	'authors/addAuthor',
	({ newAuthor, token }, { rejectWithValue }) => {
		return addAuthorRequest(newAuthor, token)
			.then(({ data: { result: author } }) => {
				return author;
			})
			.catch((error) => rejectWithValue(error.response.data));
	}
);

const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(getAllAuthors.fulfilled, (state, action) => action.payload)
			.addCase(getAllAuthors.rejected, (state, action) => {
				console.log(action.payload);
			})
			.addCase(addAuthor.fulfilled, (state, action) => {
				state.push(action.payload);
			})
			.addCase(addAuthor.rejected, (state, action) => {
				console.log(action.payload);
			});
	},
});

export default authorsSlice.reducer;
export const { authorsFetched } = authorsSlice.actions;
