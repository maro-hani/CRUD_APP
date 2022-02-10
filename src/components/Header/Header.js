import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Header.module.css";
import { logInOut } from "../../store/AuthSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isLogined } = useSelector((state) => state.authReducer);
  return (
    <>
      <div className={`${style.header}`}>
        <ul
          className={`d-flex justify-content-between p-2 list-unstyled bg-dark text-white ${style.navLinks} `}
        >
          <li>My books</li>
          <li>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                dispatch(logInOut());
              }}
            >
              {isLogined ? "logOut" : "logIn"}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
