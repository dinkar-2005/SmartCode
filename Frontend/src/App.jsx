import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import LandingPage from "./landingPage";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`);
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });
    setReview(response.data);
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {showLanding ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <LandingPage onGetStarted={() => setShowLanding(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="code-review"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <main>
              <div className="left">
                <div className="code">
                  <Editor
                    value={code}
                    onValueChange={(code) => setCode(code)}
                    highlight={(code) =>
                      prism.highlight(code, prism.languages.javascript, "javascript")
                    }
                    padding={10}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 16,
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
                <div onClick={reviewCode} className="review">
                  Review
                </div>
              </div>
              <div className="right">
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
