import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { insertReport } from "./Report";

//+++++++++++++++++++++++ get books +++++++++++++++++++++++
export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // dispatch({ type: "book/getBooks/pending", payload: undefined });
    try {
      const res = await fetch("http://localhost:8000/books");
      const data = await res.json();
      return data;
      // dispatch({ type: "book/getBooks/fulfilled", payload: payload });
    } catch (error) {
      return rejectWithValue(error.message);
      // dispatch({ type: "book/getBooks/fulfilled", payload: error });
    }
  }
);

//+++++++++++++++++++++++ insertBook +++++++++++++++++++++++
export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (newBook, thunkAPI) => {
    //start logic of get the current date to set as report
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    //End logic of get the current date to set as report

    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch("http://localhost:8000/books", {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      // dispatch to push every book inserted at the report api
      dispatch(
        insertReport({
          name: "insertBook",
          status: "succes",
          book: newBook,
          date: dateTime,
        })
      );
      return data;
    } catch (error) {
      dispatch(
        insertReport({
          name: "insertBook",
          status: "succes",
          book: newBook,
          date: dateTime,
        })
      );
      return rejectWithValue(error);
    }
  }
);

//+++++++++++++++++++++++ delete book +++++++++++++++++++++++
export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:8000/books/${book.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return book;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//+++++++++++++++++++++++ ubdateBook +++++++++++++++++++++++
export const ubdateBook = createAsyncThunk(
  "book/ubdateBook",
  async (book, thunkAPI) => {
    console.log("book", book.data, "+++ ", "id :" + book.id);
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:8000/books/${book.id}`, {
        method: "PUT",
        body: JSON.stringify(book.data),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue;
    }
  }
);

//+++++++++++++++++++++++ getBookbyId +++++++++++++++++++++
export const getBookById = createAsyncThunk(
  "book/getBookById",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:8000/books/${book.id}`);
      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    isLoading: false,
    error: null,
    bookDetail: null,
    bookUbdate: false,
  },
  reducers: {
    setUbdate: function (state, action) {
      state.bookUbdate = true;
      state.bookUbdate = action.payload;
    },
  },
  extraReducers: {
    // getBooks
    [getBooks.pending]: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
      state.bookDetail = null;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //insertBook
    [insertBook.pending]: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.books.push(action.payload);
      state.isLoading = false;
      state.bookDetail = null;
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //deleteBook
    [deleteBook.pending]: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload.id);
      state.isLoading = false;
      state.bookDetail = null;
    },

    //getBookById
    [getBookById.pending]: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    [getBookById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookDetail = action.payload;
    },
    [getBookById.rejected]: (state, action) => {
      state.error = action.payload;
    },
    //ubdateBook

    [ubdateBook.fulfilled]: (state, action) => {
      state.books.map((book) => {
        if (book.id === action.payload.id) {
          book.title = action.payload.title;
          book.price = action.payload.price;
          book.description = action.payload.description;
          state.bookDetail = null;
          return book;
        } else {
          state.bookDetail = null;
          return book;
        }
      });
      state.bookUbdate = false;
    },
    [ubdateBook.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUbdate } = bookSlice.actions;
export default bookSlice.reducer;
