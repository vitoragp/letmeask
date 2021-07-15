import * as React from "react";
import { Question } from "../../models/Question";

/***
 * QuestionContextType
 */

type QuestionContextType = {
  question: Question;
};

/***
 * QuestionContext
 */

export const QuestionContext = React.createContext<QuestionContextType>(
  {} as QuestionContextType
);

/***
 * QuestionContextProvider
 */

export const QuestionContextProvider = QuestionContext.Provider;
