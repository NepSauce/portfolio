

import React, { useState, useEffect } from "react";
import "../App.css";




function TerminalTyping({ text = "", speed = 120 }) {
    const [displayed, setDisplayed] = useState("");
    const [mode, setMode] = useState("typing"); // typing or erasing
    const [index, setIndex] = useState(0);
    const [eraseTo, setEraseTo] = useState(0);

    useEffect(() => {
        let interval: any;
        if (!text || typeof text !== "string") return;
        if (mode === "typing") {
            interval = setInterval(() => {
                setDisplayed((prev) => {
                    if (index < text.length) {
                        return prev + text[index];
                    }
                    return prev;
                });
                setIndex((i) => {
                    if (i < text.length) return i + 1;
                    return i;
                });
                if (index + 1 >= text.length) {
                    // Pause after finishing typing
                    setTimeout(() => {
                        // Randomly decide how much to erase (1 to text.length)
                        const eraseAmount = Math.floor(Math.random() * text.length);
                        setEraseTo(text.length - eraseAmount);
                        setMode("erasing");
                    }, 1200 + Math.random() * 1200);
                }
            }, speed + Math.random() * 80);
        } else if (mode === "erasing") {
            interval = setInterval(() => {
                setDisplayed((prev) => {
                    if (index > eraseTo) {
                        return prev.slice(0, -1);
                    }
                    return prev;
                });
                setIndex((i) => {
                    if (i > eraseTo) return i - 1;
                    return i;
                });
                if (index - 1 < eraseTo) {
                    setTimeout(() => setMode("typing"), 800 + Math.random() * 800);
                }
            }, speed + Math.random() * 80);
        }
        return () => clearInterval(interval);
    }, [mode, index, text, speed, eraseTo]);

    useEffect(() => {
        if (mode === "typing" && index === 0) setDisplayed("");
        if (mode === "erasing" && index === text.length) setDisplayed(text);
    }, [mode, index, text]);

    return (
        <span style={{ color: "#00ff00", background: "#222", padding: "0 4px", borderRadius: "4px" }}>
            {displayed}
            <span className="terminal-cursor">█</span>
        </span>
    );
}




function HomePage() {
    return (
        <div
            style={{
                background: "#1e1e2f",
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Fira Mono', 'Consolas', monospace",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        fontSize: "5rem",
                        fontWeight: 700,
                        color: "#00ff00",
                        marginBottom: "2rem",
                        letterSpacing: "0.05em",
                    }}
                >
                    Hi, I'm Zawad <TerminalTyping text="Atif" speed={350} />
                </div>
                <div
                    style={{
                        fontSize: "2rem",
                        color: "#fff",
                        marginTop: "1rem",
                        opacity: 0.85,
                    }}
                >
                    // Welcome to my portfolio
                </div>
            </div>
        </div>
    );
}

export default HomePage;