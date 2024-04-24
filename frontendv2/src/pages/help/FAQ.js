import React from "react";
import { FcFaq } from "react-icons/fc";
import NavBar from "../NavBar";
import Footer from "../Footer";
const FAQ = () => {
  const questions = [
    {
      question: "What is Donate What Where?",
      answer:
        "Donate What Where is a platform designed to facilitate and streamline the process of making donations to various causes and organizations.",
    },
    {
      question: "How does Donate What Where work?",
      answer:
        "Donate What Where allows users to browse through different campaigns or organizations seeking donations. Users can select a cause they're interested in and make a donation directly through the app.",
    },
    {
      question: "Do I need to create an account to donate?",
      answer:
        "Yes, creating an account is required to make donations through DWW. This allows us to provide you with donation receipts and track your contributions.",
    },
    {
      question: "How do I register for an account?",
      answer:
        "To register, simply click on the 'Get Started' or 'Register' button on the app's homepage and follow the prompts to create your account.",
    },
    // ... add more questions and answers
  ];

  return (
    <div className="faq-container">
      <NavBar />
      <div className="faq">
        <h2
          style={{
            color: "#f55951",
            alignItems: "center",
          }}
        >
          Frequently Asked Questions{" "}
          <FcFaq
            style={{
              width: "30px",
              height: "auto",
            }}
          />
        </h2>
        {questions.map((item, index) => (
          <div key={index} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
