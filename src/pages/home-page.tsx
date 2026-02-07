

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
        <span style={{ color: "#00ff00" }}>
            {displayed}
            <span className="terminal-cursor">█</span>
        </span>
    );
}




function HomePage() {
    const [command, setCommand] = useState("");
    const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => setCommand(e.target.value);
    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just clear the input
        setCommand("");
    };

    return (
        <div
            style={{
                background: "linear-gradient(180deg, #181818 0%, #232323 100%)",
                minHeight: "100vh",
                width: "100vw",
                fontFamily: "'VT323', monospace",
                color: "#00ff00",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "stretch",
                boxSizing: "border-box",
                padding: 0,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* CRT curve/vignette overlay */}
            <div
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 3,
                        background:
                            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.18) 100%)",
                }}
            />
            {/* Scanline overlay for vintage effect */}
            <div
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 2,
                        background: "repeating-linear-gradient(0deg, transparent, transparent 16px, rgba(0,0,0,0.05) 17px)",
                }}
            />
            {/* Intro at top center */}
            <div
                style={{
                    width: "100%",
                    textAlign: "center",
                    paddingTop: "64px",
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <div
                    style={{
                        fontSize: "5rem",
                        fontWeight: 700,
                        marginBottom: "2.5rem",
                        letterSpacing: "0.01em",
                        fontFamily: "'VT323', monospace",
                        textShadow: "0 1px 0 #222, 0 2px 0 #111",
                        textAlign: "center",
                        display: "inline-block",
                    }}
                >
                    <div style={{color: "white"}}>Hi, I'm Zawad</div>
                    <div><TerminalTyping text="Atif" speed={350} /></div>
                </div>
            </div>
            {/* Terminal content */}
            <div style={{ padding: "0 24px 0 24px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div style={{ fontSize: "2.2rem", opacity: 0.85, marginBottom: "2.5rem", textAlign: "left" }}>
                    // Welcome to my portfolio
                </div>
            </div>
            {/* Command input at bottom */}
            <form
                onSubmit={handleCommandSubmit}
                style={{
                    width: "100%",
                    padding: "0 24px 32px 24px",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <span style={{ fontWeight: 600, fontSize: "1.2rem", marginRight: 8 }}>$</span>
                <input
                    type="text"
                    value={command}
                    onChange={handleCommandChange}
                    style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#00ff00",
                        fontSize: "1.2rem",
                        fontFamily: "'VT323', monospace",
                        flex: 1,
                    }}
                    autoFocus
                    spellCheck={false}
                />
            </form>
        </div>
    );
}

export default HomePage;