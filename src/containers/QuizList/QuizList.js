import classes from "./QuizList.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Axios from "../../axios/axios-request";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends React.Component {
  state = {
    quizes: [],
    loading: true,
  };

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const response = await Axios("quizes.json");
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });
      this.setState({
        quizes,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }

    console.log(this.state.quizes);
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>
          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}

export default QuizList;
