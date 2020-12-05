import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import React from "react";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
  state = {
    results: {},
    activeQuestion: 0,
    isFinished: false,
    answerState: null,
    quiz: [
      {
        question: "Что такое React?",
        rightAnswer: 2,
        id: 1,
        answers: [
          { text: "Язык программирования", id: 1 },
          { text: "Библиотека", id: 2 },
          { text: "Фреймворк", id: 3 },
          { text: "Реактивный двигатель", id: 4 },
        ],
      },
      {
        question: "Что такое Props?",
        rightAnswer: 3,
        id: 2,
        answers: [
          { text: "Состояние", id: 1 },
          { text: "Ссылки", id: 2 },
          { text: "Свойства", id: 3 },
          { text: "Я не знаю", id: 4 },
        ],
      },
      {
        question: "Что такое JSX?",
        rightAnswer: 1,
        id: 3,
        answers: [
          { text: "Ярлык для JavaScript XML", id: 1 },
          { text: "Язык стилей", id: 2 },
          { text: "фреймворк для React", id: 3 },
          { text: "Язык запросов", id: 4 },
        ],
      },
      {
        question: "Что такое Virtual DOM в React?",
        rightAnswer: 2,
        id: 4,
        answers: [
          { text: "Что-то виртуальное", id: 1 },
          { text: "Объект, копия реального DOM дерева", id: 2 },
          { text: "Массив HTML элементов", id: 3 },
          { text: "Тип данных в JavaScript", id: 4 },
        ],
      },
      {
        question: "Что такое State?",
        rightAnswer: 4,
        id: 5,
        answers: [
          { text: "функция", id: 1 },
          { text: "Ссылки", id: 2 },
          { text: "Свойства", id: 3 },
          { text: "Состояние интерфейса", id: 4 },
        ],
      },
      {
        question: "Что такое Jest?",
        rightAnswer: 3,
        id: 6,
        answers: [
          { text: "Промис", id: 1 },
          { text: "CMS", id: 2 },
          { text: "фреймворк для unit тестирования", id: 3 },
          { text: "Для работы с асинхронным кодом", id: 4 },
        ],
      },
      {
        question: "Какая разница между Props и State?",
        rightAnswer: 3,
        id: 7,
        answers: [
          { text: "Никакой", id: 1 },
          { text: "Props можно изменнять, а State нет", id: 2 },
          { text: "State можно изменнять, а Props нет", id: 3 },
          { text: "Понятия не имею", id: 4 },
        ],
      },
      {
        question: "Что значит компонент mounted?",
        rightAnswer: 3,
        id: 8,
        answers: [
          { text: "Ещё не отрисован", id: 1 },
          { text: "Не может быть отрисован", id: 2 },
          { text: "Соединен с DOM деревом", id: 3 },
          { text: "Вернёт промис", id: 4 },
        ],
      },
      {
        question: "Что такое Redux?",
        rightAnswer: 4,
        id: 9,
        answers: [
          { text: "ЧТо-то не понятное", id: 1 },
          { text: "Жизненный цикл компонента", id: 2 },
          { text: "функция обратного вызова", id: 3 },
          { text: "Объект, содержащий все состояние приложения", id: 4 },
        ],
      },
      {
        question: "Можно изменять state на прямую?",
        rightAnswer: 2,
        id: 10,
        answers: [
          { text: "Да", id: 1 },
          { text: "Нет", id: 2 },
          { text: "Иногда", id: 3 },
          { text: "Я только так и изменяю state", id: 4 },
        ],
      },
      {
        question: "Для чего делается eject?",
        rightAnswer: 3,
        id: 11,
        answers: [
          { text: "Чтобы было", id: 1 },
          { text: "Сбросить настройки", id: 2 },
          { text: "Для модификации конфигурации проекта", id: 3 },
          { text: "Для тестирования", id: 4 },
        ],
      },
      {
        question: "Зачем нужен Redux Thunk?",
        rightAnswer: 2,
        id: 12,
        answers: [
          { text: "Отключает асинхронный режим", id: 1 },
          {
            text: "Позволяет изменять остояние в Redux в асинхронном режиме",
            id: 2,
          },
          { text: "Не пользуюсь", id: 3 },
          { text: "Это как Redux, только Redux Thunk", id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswer === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results,
      });

      const timer = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }

        window.clearTimeout(timer);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      isFinished: false,
      answerState: null,
      results: {},
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
