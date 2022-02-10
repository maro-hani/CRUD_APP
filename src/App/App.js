import React, { Fragment } from "react";
import AddForm from "../components/AddForm/AddForm";
import BookContainer from "../components/BookContainer/BookContainer";
import Header from "../components/Header/Header";

const App = () => {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <AddForm/>
        <BookContainer/>
      </div>
    </Fragment>
  );
};

export default App;
