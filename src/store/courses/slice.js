import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpRequestService } from '../../services';

const {
	getAllCoursesRequest,
	addCourseRequest,
	updateCourseRequest,
	deleteCourseRequest,
} = httpRequestService();

const initialState = [];

export const getAllCourses = createAsyncThunk(
	'courses/getAllCourses',
	function (_, { rejectWithValue }) {
		return getAllCoursesRequest()
			.then(({ data: { result } }) => result)
			.catch((error) => rejectWithValue(error));
	}
);

export const addCourse = createAsyncThunk(
	'courses/addCourse',
	function ({ newCourse, token }, { dispatch }) {
		return addCourseRequest(newCourse, token).then(
			({ data: { result: course } }) => {
				dispatch(addCourseToStore(course));
				// return course;
			}
		);
	}
);

export const updateCourse = createAsyncThunk(
	'courses/updateCourse',
	function ({ id, updatedCourse, token }, { rejectWithValue, getState }) {
		return updateCourseRequest(id, updatedCourse, token)
			.then(({ data: { result: course } }) => {
				const allCourses = [...getState().courses];
				const index = allCourses.findIndex(
					(courseItem) => courseItem.id === course.id
				);
				allCourses.splice(index, 1, course);
				return allCourses;
			})
			.catch((error) => rejectWithValue(error.response.data));
	}
);

export const deleteCourse = createAsyncThunk(
	'courses/deleteCourse',
	function ({ id, token }, { rejectWithValue }) {
		return deleteCourseRequest(id, token)
			.then(() => id)
			.catch((error) => rejectWithValue(error.response.data));
	}
);

const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		coursesFetched(state, action) {
			return action.payload;
		},
		addCourseToStore(state, action) {
			state.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllCourses.fulfilled, (state, action) => action.payload)
			.addCase(getAllCourses.rejected, (state, action) => {
				console.log(action.payload);
			})
			// .addCase(addCourse.fulfilled, (state, action) => {
			// 	console.log(action);
			// 	state.push(action.payload);
			// })
			.addCase(addCourse.rejected, (state, action) => {
				console.log(action.error);
			})
			.addCase(updateCourse.fulfilled, (state, action) => action.payload)
			.addCase(updateCourse.rejected, (state, action) => {
				console.log(action.payload);
			})
			.addCase(deleteCourse.fulfilled, (state, action) =>
				state.filter(({ id }) => id !== action.payload)
			);
	},
});

console.log(coursesSlice.reducer);
export default coursesSlice.reducer;
export const { addCourseToStore } = coursesSlice.actions;
