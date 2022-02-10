import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getBookById, setUbdate } from "../../../store/bookSlice";

const BooksList = ({ isLoading, books, error }) => {
  const dispatch = useDispatch();
  const {
    authReducer: { isLogined },
  } = useSelector((state) => state);
  const allBooks =
    books.length > 0
      ? books.map((book) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between "
              key={book.id}
            >
              <h3 className="h4">{book.title}</h3>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!isLogined}
                  onClick={() => {
                    dispatch(getBookById(book));
                  }}
                >
                  info
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  disabled={!isLogined}
                  onClick={() => dispatch(setUbdate(book))}
                >
                  ubdate
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={!isLogined}
                  onClick={() => {
                    dispatch(deleteBook(book));
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })
      : "there is no books avilable";

  return (
    <>
      <h2 className="text-start">Books List</h2>
      {isLoading ? (
        "loading..."
      ) : error ? (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <ul className="list-group">{allBooks}</ul>
      )}
    </>
  );
};

export default BooksList;
