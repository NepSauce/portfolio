

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
                background: "#181818",
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
            {/* CRT vignette overlay */}
            <div style={{
                pointerEvents: "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 3,
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)"
            }} />
            {/* Scanline overlay for vintage effect */}
            <div style={{
                pointerEvents: "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 2,
                background: "repeating-linear-gradient(0deg, transparent, transparent 13px, rgba(0,0,0,0.10) 14px)",
                mixBlendMode: "overlay"
            }} />
            {/* Subtle CRT glow */}
            <div style={{
                pointerEvents: "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 4,
                background: "radial-gradient(circle at 50% 40%, rgba(94,255,0,0.08) 0%, rgba(0,0,0,0) 60%)"
            }} />
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
                <div className="code-font" style={{marginBottom: "2.5rem", display: "inline-block"}}>
                    <div style={{color: "white"}}>Hi, I'm Zawad</div>
                    <div><TerminalTyping text="Atif" speed={350} /></div>
                </div>
            </div>
            {/* Terminal UI under introduction */}
            <div className="terminal-box" style={{ margin: "0 auto", maxWidth: 800, minHeight: 220 }}>
                <div className="terminal-header">PortfolioShell v1.0.0</div>
                <div className="terminal-comment">Copyright (c) Zawad Atif. All rights reserved.</div>
                <div className="terminal-comment">Type <span style={{ color: '#5eff00' }}>'help'</span> for available commands.</div>
                <div style={{ marginTop: '2rem', color: '#5eff00', fontFamily: 'Fira Mono, Consolas, monospace' }}>
                    $ <input
                        type="text"
                        value={command}
                        onChange={handleCommandChange}
                        style={{
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            color: "#5eff00",
                            fontSize: "1.2rem",
                            fontFamily: "Fira Mono, Consolas, monospace",
                            width: "80%",
                        }}
                        autoFocus
                        spellCheck={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomePage;