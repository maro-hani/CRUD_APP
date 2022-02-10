import React, { useEffect, useRef, useState } from "react";
import style from "./AddForm.module.css";
import { insertBook, ubdateBook } from "../../store/bookSlice";
import { useDispatch, useSelector } from "react-redux";

const AddForm = () => {
  const dispatch = useDispatch();
  // ref to access the submit btn
  const btnSubmit = useRef();

  //Distracting from global state
  const {
    authReducer: { isLogined },
    BookReducer: { bookUbdate },
  } = useSelector((state) => state);

  // inputs values
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // get values from inputs to dispatch to store to insert into api and state of book slice
  const handleSubmet = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      price: price,
      description: description,
    };
    if (btnSubmit.current.innerHTML === "submit") {
      dispatch(insertBook(data));
      clearForm();
    }
    if (btnSubmit.current.innerHTML === "ubdate") {
      dispatch(ubdateBook({ data: data, id: bookUbdate.id }));
      clearForm();
      btnSubmit.current.innerHTML = "submit";
    }
  };

  // set the values of the book clicked  into the inputs to ubdating
  useEffect(() => {
    if (bookUbdate) {
      btnSubmit.current.innerHTML = "ubdate";
      setTitle(bookUbdate.title);
      setPrice(bookUbdate.price);
      setDescription(bookUbdate.description);
    }
  }, [bookUbdate]);

  // methode to clear input after submit
  const clearForm = () => {
    setTitle("");
    setPrice("");
    setDescription("");
  };
  return (
    <>
      <div className="formAdd  d-flex justify-content-center mt-1">
        <form className=" w-50 " onSubmit={handleSubmet}>
          <h2>insert Book</h2>
          <div className={`${style.formContent}`}>
            <label htmlFor="title" className="d-block">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={`${style.formContent}`}>
            <label htmlFor="price" className="d-block">
              price
            </label>
            <input
              className="form-control"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={`${style.formContent}`}>
            <label htmlFor="disc" className="d-block">
              Discreption
            </label>
            <textarea
              className="form-control"
              id="disc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            className="btn btn-primary m-2"
            type="submit"
            disabled={!isLogined}
            ref={btnSubmit}
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddForm;
