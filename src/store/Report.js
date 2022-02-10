import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const insertReport = createAsyncThunk(
  "report/insertReport",
  async (report, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:8000/systemLogs", {
        method: "POST",
        body: JSON.stringify(report),
        headers: { "Content-Type": "application/json" },
      });
      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: { logs: [] },
  extraReducers: {
    [insertReport.pending]: (state, action) => {},
    [insertReport.fulfilled]: (state, action) => {
      state.logs.push(action.payload);
    },
    [insertReport.rejected]: (state, action) => {
    },
  },
});

export default reportSlice.reducer;
