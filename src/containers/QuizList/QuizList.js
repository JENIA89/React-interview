import classes from "./QuizList.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

class QuizList extends React.Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={"/quiz/" + quiz}>Тест {quiz}</NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>
          <u>{this.renderQuizes()}</u>
        </div>
      </div>
    );
  }
}

export default QuizList;
