import React from "react";

export default function() {
    return (
        <div className="shortcuts">
          <div>
            <h3>Shortcuts</h3>
            <ul>
              <li>
                Pause/Play : <kbd>Space</kbd>
              </li>
              <li>
                Start Pomodoro: <kbd>Alt</kbd> + <kbd>p</kbd>
              </li>
              <li>
                Start Long Break: <kbd>Alt</kbd> + <kbd>l</kbd>
              </li>
              <li>
                Start Short Break: <kbd>Alt</kbd> + <kbd>s</kbd>
              </li>
              <li>
                Reset Timer: <kbd>Alt</kbd> + <kbd>r</kbd>
              </li>
            </ul>
          </div>
        </div>
    );
};