import React, { useState } from "react";
import "./Chatbot.css";
import sendicon from "../assets/Icons/send-icon.png";
import chaticon from "../assets/Icons/Group 35579.svg?url";

interface Message {
  type: "user" | "model";
  text: string;
}

interface StepNode {
  question: string;
  options?: { text: string; nextId: string }[];
  end?: boolean;
}

const steps: Record<string, StepNode> = {
  start: {
    question: "Hi, How Can I Help You?",
    options: [
      { text: "What courses do you offer?", nextId: "courses" },
      { text: "How do I apply?", nextId: "apply" },
      { text: "Talk to someone", nextId: "talk" },
      { text: "Is financial aid available?", nextId: "aid" },
    ],
  },

  // Courses Branch
  courses: {
    question: "We offer tech, design, and business courses. What are you interested in?",
    options: [
      { text: "Tech", nextId: "tech" },
      { text: "Design", nextId: "design" },
      { text: "Business", nextId: "business" },
      { text: "Back", nextId: "start" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },

  // Tech Branch
  tech: {
    question: "We have Web Dev, Data Science, and AI. Choose one:",
    options: [
      { text: "Web Development", nextId: "webdev" },
      { text: "Data Science", nextId: "datasci" },
      { text: "AI & Machine Learning", nextId: "ai" },
      { text: "Back", nextId: "courses" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },
  webdev: {
    question: "Web Development includes HTML, CSS, JS, and React. Ready to enroll?",
    options: [
      { text: "Yes", nextId: "enroll" },
      { text: "Tell me more", nextId: "webdevMore" },
      { text: "Back", nextId: "tech" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },
  webdevMore: {
    question: "You will learn full-stack dev over 12 weeks. Need something else?",
    options: [
      { text: "Apply Now", nextId: "apply" },
      { text: "Back to courses", nextId: "courses" },
      { text: "Back", nextId: "webdev" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },
  datasci: {
    question: "Data Science includes Python, Pandas, and ML. Want to proceed?",
    options: [
      { text: "Yes", nextId: "enroll" },
      { text: "Show other courses", nextId: "courses" },
      { text: "Back", nextId: "tech" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },
  ai: {
    question: "Our AI course covers NLP, CV, and deep learning. Interested?",
    options: [
      { text: "Yes", nextId: "enroll" },
      { text: "More about instructors", nextId: "instructors" },
      { text: "Back", nextId: "tech" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },

  // Design Branch
  design: {
    question: "We offer Graphic Design and UI/UX Design. Choose one:",
    options: [
      { text: "Graphic Design", nextId: "graphic" },
      { text: "UI/UX Design", nextId: "uiux" },
      { text: "Back", nextId: "courses" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },
  graphic: {
    question: "Graphic Design focuses on Adobe tools, typography, branding. Proceed?",
    options: [
      { text: "Yes", nextId: "enroll" },
      { text: "Back to design", nextId: "design" },
      { text: "Back", nextId: "design" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },
  uiux: {
    question: "UI/UX includes Figma, wireframing, and user testing. Interested?",
    options: [
      { text: "Yes", nextId: "enroll" },
      { text: "Need more details", nextId: "uiuxMore" },
      { text: "Back", nextId: "design" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },
  uiuxMore: {
    question: "You'll work on real-world projects with mentoring support.",
    options: [
      { text: "Apply now", nextId: "apply" },
      { text: "Back to start", nextId: "start" },
      { text: "Back", nextId: "uiux" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },

  // Business Branch
  business: {
    question: "We offer Marketing and Entrepreneurship. Choose one:",
    options: [
      { text: "Marketing", nextId: "marketing" },
      { text: "Entrepreneurship", nextId: "entrepreneurship" },
      { text: "Back", nextId: "courses" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },
  marketing: {
    question: "Marketing includes SEO, ads, analytics. Want to continue?",
    options: [
      { text: "Yes", nextId: "enroll" },
      { text: "Back to business", nextId: "business" },
      { text: "Back", nextId: "business" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },
  entrepreneurship: {
    question: "Entrepreneurship teaches funding, pitching, and business models.",
    options: [
      { text: "Enroll", nextId: "enroll" },
      { text: "Ask a counselor", nextId: "talk" },
      { text: "Back", nextId: "business" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },

  // Apply Flow
  apply: {
    question: "You can apply through our website. Need help with anything else?",
    options: [
      { text: "Talk to someone", nextId: "talk" },
      { text: "Back to start", nextId: "start" },
      { text: "Back", nextId: "start" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },

  // Aid
  aid: {
    question: "Yes! Scholarships and payment plans are available. Interested?",
    options: [
      { text: "Apply for aid", nextId: "apply" },
      { text: "Back to main menu", nextId: "start" },
      { text: "Back", nextId: "start" },
    ],
  },

  // Instructor Details
  instructors: {
    question: "Our instructors are industry experts with 5–10 years experience.",
    options: [
      { text: "Great, I want to enroll", nextId: "enroll" },
      { text: "Back to tech courses", nextId: "tech" },
      { text: "Back", nextId: "ai" },
      { text: "Back to main menu", nextId: "start" },
    ],
  },

  // Final Steps
  enroll: {
    question: "🎉 Awesome! You can now ask anything else below 👇",
    end: true,
  },
  talk: {
    question: "Connecting you to a support representative...",
    end: true,
  },
  end: {
    question: "Thanks! You can now ask anything else below 👇",
    end: true,
  },
};



const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: "model", text: steps["start"].question },
  ]);
  const [currentStep, setCurrentStep] = useState<string>("start");
  const [chatshow, setChatshow] = useState<boolean>(false);
  const [usermsg, setUsermsg] = useState<string>("");
  const [inputEnabled, setInputEnabled] = useState<boolean>(false);

  const toggleChat = () => {
    setChatshow(!chatshow);
  };

  const handleOptionClick = (option: { text: string; nextId: string }) => {
    const userText = option.text;
    const next = steps[option.nextId];

    setMessages((prev) => [
      ...prev,
      { type: "user", text: userText },
      { type: "model", text: next.question },
    ]);

    setCurrentStep(option.nextId);

    if (next.end) {
      setInputEnabled(true);
    }
  };

  const handleSend = () => {
    if (usermsg.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: usermsg },
      { type: "model", text: "Thanks! We'll get back to you soon." },
    ]);
    setUsermsg("");
  };

  return (
    <div className={chatshow ? "chat-open" : ""}>
      <div className="chat-button" onClick={toggleChat}>
        <img src={chaticon} alt="chat icon" className="chaticon" />
      </div>

      {chatshow && (
        <section className="chat-window">
          <button className="close" onClick={toggleChat}>
            X
          </button>

          <div className="chat">
            {messages.map((msg, i) => (
              <div key={i} className={msg.type}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {!inputEnabled && steps[currentStep].options && (
            <div className="suggested-inputs">
              {steps[currentStep].options!.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className="suggestion-btn"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          )}

          {inputEnabled && (
            <div className="input-area">
              <input
                placeholder="Ask me anything..."
                value={usermsg}
                onChange={(e:any) => setUsermsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>
                <img src={sendicon} alt="send icon" />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Chatbot;
