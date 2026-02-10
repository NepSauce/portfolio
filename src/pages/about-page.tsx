import React from "react";
import "../App.css";

function AboutPage() {
    return (
        <div className="terminal-box">
            <div className="terminal-header">
                PortfolioShell v1.0.0
            </div>
            <div className="terminal-comment">
                Copyright (c) Zawad Atif. All rights reserved.
            </div>
            <div className="terminal-comment">
                Type <span style={{ color: '#5eff00' }}>'help'</span> for available commands.
            </div>
            <div style={{ marginTop: '2rem', color: '#5eff00', fontFamily: 'Fira Mono, Consolas, monospace' }}>
                $ about
            </div>
            <div style={{ marginTop: '1rem', color: '#d4d4d4', fontFamily: 'Fira Mono, Consolas, monospace' }}>
                meowl page :3
            </div>
        </div>
    );
}

export default AboutPage;