import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../store/bookSlice";
import BookInfo from "./BookInfo/BookInfo";
import BooksList from "./BooksList/BooksList";

const BookContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, books, error, bookDetail } = useSelector(
    (state) => state.BookReducer
  );

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <>
      <div className="row text-center my-5  border-top border-2 p-5   m-auto">
        <div className="col border-end border-2 ">
          <BooksList isLoading={isLoading} books={books} error={error}  />`
        </div>
        <div className="col">
          <BookInfo bookDetail={bookDetail}/>
        </div>
      </div>
    </>
  );
};

export default BookContainer;
