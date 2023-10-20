import React, { Component } from "react";
import { Statistics } from "./Statistics/Statistics";
import { Section } from "./Section/Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Notification } from "./Notification/Notification";


export class App extends Component {

  state = {
  good: 0,
  neutral: 0,
  bad: 0
  }  

  handleFeedback = option => {
    this.setState(prevState => ({
        [option]: prevState[option] + 1 
    }))
  }

  countTotalFeedback = () => {
    let total = this.state.good + this.state.neutral + this.state.bad
    return total
  }

  countPositiveFeedbackPercentage = () => {
    if (this.state.good === 0) {
      return 0;
    }
     return Math.round((this.state.good / this.countTotalFeedback()) * 100)
  }

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
     return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        background: 'linear-gradient(90deg, #eee8d1, #f8c4af)'
      }}
       >
         <Section title="Please leave feedback" />
         <FeedbackOptions
           options={options}
           onLeaveFeedback={this.handleFeedback}
         />
         <Section title="Statistics" />
         {this.countTotalFeedback() === 0 ?
           (<Notification
           message="There is no feedback"
         />) : 
         (
         <Statistics
           good={good}
           neutral={neutral}
           bad={bad}
           total={this.countTotalFeedback()}
           positivePercentage={this.countPositiveFeedbackPercentage()}
         />)}
         
    </div>
  );
  }
 
};
