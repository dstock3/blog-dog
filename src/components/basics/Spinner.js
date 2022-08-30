import React, { useEffect, useState } from 'react';
import '../style/spinner.css';

const Spinner = ({isMini, theme, imgLoader}) => {
  const [imgLoaderClass, setImgLoaderClass] = useState("")

  useEffect(()=> {

    if (imgLoader) {
      setImgLoaderClass("img-loader")
    }
  }, [])

  if (isMini) {
    return (
      <div className={"mini-spinner-container " + imgLoaderClass}>
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