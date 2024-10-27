import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
    const [inputText, setInputText] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        setLoading(true);
        const response = await fetch("https://text-summarizer-mvp.onrender.com/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputText })
        });
        const data = await response.json();
        
        setSummary(data.summary);
        setLoading(false);
    };

    return (
        <div className="app-container">
            <h1>Text Summarization</h1>
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text between 25 to 500 words to summarize"
                className="text-area"
            />
            <button 
                onClick={handleSummarize} 
                className="summarize-button" 
                disabled={!inputText.trim()} // Disable button if inputText is empty or only whitespace
            >
                Summarize
            </button>
            <h2>Summary:</h2>
            <p className="summary-text">{loading ? "Loading..." : summary}</p>
        </div>
    );
}

export default App;