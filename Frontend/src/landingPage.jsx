import { motion } from "framer-motion";
import "./App.css";

const LandingPage = ({ onGetStarted }) => {
  return (
    <motion.div
      className="h-full bg-gradient-to-b from-[#1E1E40] to-[#2D2D69]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="boxL">
        {/* Left Content */}
        <div className="leftL">
          <h1 className="smartcodeL">SmartCode</h1>
          <p className="text1L">Meet SmartCode AI-Powered Code Review Partner</p>
          <p className="text2L">
            Improve your code quality and productivity with real-time AI feedback
            and intelligent suggestions. SmartCode helps you write cleaner code and avoid potential bugs before they happen.
          </p>
          <button
            onClick={onGetStarted}
            className="buttonL"
          >
            Get Started
          </button>
        </div>

        {/* Right Image */}
        <div className="rightL">
          <img
            src="/src/assets/robo.png"
            alt="SmartCode Illustration"
            className="imgL"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
