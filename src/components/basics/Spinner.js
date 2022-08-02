import React from 'react';
import '../style/spinner.css';

const Spinner = ({isMini, theme}) => {
  if (isMini) {
    return (
      <div className="mini-spinner-container">
        <div className={"mini-spinner loading-" + theme}></div>
      </div>
    )
  } else {
    return (
      <main className="blog">
          <div className="spinner-container">
              <div className={"spinner loading-" + theme}></div>
          </div>
      </main>
    )
  }
}

export default Spinner