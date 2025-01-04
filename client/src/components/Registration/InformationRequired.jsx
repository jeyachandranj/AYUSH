import React,{useState} from "react";
import { putEntityDetails } from "../../services/registrationService";
function InformationRequired({ setStep ,step }) {
    const [cardPicked, setCardPicked] = useState(null);
    const [answers, setAnswers] = useState({});
  
    const handleCardClick = (index) => {
      setCardPicked(index);
    };
  
    const handleAnswerChange = (questionIndex, answer) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionIndex]: answer,
      }));
    };
  
    const allQuestionsAnswered = questions.every((_, index) => answers[index] !== undefined);
    const canContinue = cardPicked !== null && allQuestionsAnswered;
  
    const submit = () => {
      if (canContinue) {
        setStep((prev) => prev + 1);
        const mergedArray = questions.map((item, index) => ({
          question:item.question,
          answer:answers[index] // Update the 'ans' property with the corresponding answer
        }));
        console.log(mergedArray);
        putEntityDetails({mergedArray,cardPicked,step});
        //console.log(cardPicked, answers,questions);
      }
    };
  
    return (
      <section className="h-screen bg-white overflow-y-auto flex flex-col w-100 pt-5">
        <div className="container mx-auto p-2 flex-grow w-75">
          <h1 className="text-xl font-bold mb-2">Information Required</h1>
          <p className="text-sm mb-4">
            Please provide the information below to help us better understand your startup.
          </p>
          <div className="flex justify-center gap-4 p-1">
            {cardData.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-1/4 max-w-xs h-48 rounded overflow-hidden shadow-lg bg-white p-4 cursor-pointer transition-transform transform ${
                  cardPicked === index
                    ? "border-4 border-green-500 scale-105"
                    : "hover:scale-105 hover:bg-green-100"
                }`}
              >
                <div className="font-bold text-lg mb-2">{card.title}</div>
                <p className="text-gray-700 text-sm overflow-y-auto h-32">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">About your startup</h2>
            {questions.map((q, index) => (
              <div key={index} className="mb-4">
                <p className="text-base font-semibold">{q.question}</p>
                <div className="flex items-center mt-2">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="Yes"
                      checked={answers[index] === "Yes"}
                      onChange={() => handleAnswerChange(index, "Yes")}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="No"
                      checked={answers[index] === "No"}
                      onChange={() => handleAnswerChange(index, "No")}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-2 p-2">
          <button
            type="button"
            className={`p-2 rounded-md cursor-pointer m-5 ${
              canContinue
                ? "bg-green-600 text-white hover:opacity-90"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            onClick={submit}
            disabled={!canContinue}
          >
            CONTINUE
          </button>
        </div>
      </section>
    );
  }
let  questions = [
    {
      question: "Has your startup applied for any IPR (Intellectual Property Right)?*",
      answer: null
    },
    {
      question: "Is the startup creating an innovative product/service/process or improving an existing product/service/process*",
      answer: null
    },
    {
      question: "Is the startup creating a scalable business model with high potential of employment generation or wealth creation*",
      answer: null
    },
    {
      question: "Has your startup received any funding?*",
      answer: null
    },
];
const cardData = [
    {
      title: "Ideation",
      description:
        "You have an idea for a product or a service.",
    },
    {
      title: "Validation",
      description:
        "You have build Minimum Viable Product(MVP).",
    },
    {
      title: "Early Traction",
      description:"You have acquired customers, generating revenue.",
    },
    {
      title: "Scaling",
      description:"You are generating sustainable profits",
    },
  ];
export default InformationRequired;