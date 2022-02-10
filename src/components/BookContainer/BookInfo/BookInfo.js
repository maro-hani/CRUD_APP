import React from "react";

const BookInfo = ({ bookDetail }) => {
  return (
    <>
      <h2 className="text-start">book info</h2>
      <div className="alert alert-secondary">
        {bookDetail ? (
          <ul className="list-unstyled text-start">
            <li>name: {bookDetail.title}</li>
            <li>price: {bookDetail.price}</li>
            <li>description: {bookDetail.description}</li>
          </ul>
        ) : (
          "There is'nt post selelcted yet, please select!"
        )}
      </div>
    </>
  );
};

export default BookInfo;
