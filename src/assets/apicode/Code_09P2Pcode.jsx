import React, { useRef, useState, useEffect  } from "react";
import checkimg from "../images/checkmark.png";

function Code_09P2Pcode() {
  const [apiData, setApiData] = useState(null);
  const [headerHtml, setHeaderHtml] = useState(null);
  const [detailsHtml, setDetailsHtml] = useState(null);
  const [requestHtml, setRequestHtml] = useState(null);
  const [responseHtml, setResponseHtml] = useState(null);

  const codeBlockRef = useRef(null);
  const headerRef = useRef(null);
  const requestRef = useRef(null);
  const responseRef = useRef(null);
  const callbackResponseRef = useRef(null);
  
  const [isCopiedRequestedURL, setIsCopiedRequestedURL] = useState(false);
  const [isCopiedHeader, setIsCopiedHeader] = useState(false);
  const [isCopiedRequest, setIsCopiedRequest] = useState(false);
  const handleCopyClick = (snippetName, ref, setIsCopiedState) => {
    const range = document.createRange();
    range.selectNode(ref.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  
    // Display "Copied!" message for a short duration
    setIsCopiedState(true);
    setTimeout(() => {
    setIsCopiedState(false);
    }, 1500);
  };
  

useEffect(() => {
  const fetchData = async () => {
    try {
    const response = await fetch("https://centpays.com/apidoc/details/14");
    const data = await response.json();
    setApiData(data);
    // console.log(data);
    if (data && data.data && data.data.length > 0) {
      setHeaderHtml(data.data[0].header);
      setDetailsHtml(data.data[0].details);
      setRequestHtml(data.data[0].request);
      setResponseHtml(data.data[0].response);
    } else {
      console.error(
      "API response is missing expected data structure:",
      data
      );
    }
    } catch (error) {
    console.error("Error fetching API:", error);
    }
  };

  fetchData();
  }, []);


return (
  <>
    {apiData ? (
      <div>
        <div className="codeBlock">
        <div className="codeBlock-header">
          <h1>Requested URL</h1>
          <i
            className="fa-regular fa-clipboard"
            onClick={() => handleCopyClick("RequestedURL", codeBlockRef, setIsCopiedRequestedURL)}
          ></i>
          {isCopiedRequestedURL && (
            <span className="copied-message">
            <p>
              <img src={checkimg} className="icon" alt="check icon" />
              Copied!
            </p>
            </span>
          )}
          </div>
          <div className="codeBlock-body" ref={codeBlockRef}>
            {apiData.data[0].url}
          </div>
        </div>

        <div className="codeBlock">
          <div className="codeBlock-header">
            <h1>Header</h1>
            <i
              className="fa-regular fa-clipboard"
              onClick={() => handleCopyClick("BaseURL",headerRef,setIsCopiedHeader)}
            ></i>
            {isCopiedHeader && (
              <span className="copied-message">
              <p>
                <img src={checkimg} className="icon" alt="check icon" />
                Copied!
              </p>
              </span>
            )}
          </div>
          <div style={{overflow:"auto"}} className="codeBlock-body" ref={headerRef}>
            <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
          </div>
        </div>

        <div className="codeBlock">
          <div className="codeBlock-header">
            <h1>Request</h1>
            <i
              className="fa-regular fa-clipboard"
              onClick={() => handleCopyClick("BaseURL",requestRef,setIsCopiedRequest)}
            ></i>
            {isCopiedRequest && (
              <span className="copied-message">
              <p>
                <img src={checkimg} className="icon" alt="check icon" />
                Copied!
              </p>
              </span>
            )}
          </div>
          <div className="codeBlock-body" ref={requestRef}>
            <div dangerouslySetInnerHTML={{ __html: requestHtml }} />
          </div>
        </div>

        <div className="textBlock">
          <div className="textBlock-header">
            <h1>Response</h1>
          </div>
          <div className="textBlock-body" ref={responseRef}>
            <div dangerouslySetInnerHTML={{ __html: responseHtml }} />
          </div>
        </div>

        <div className="textBlock">
          <div className="textBlock-header">
            <h1>Details</h1>
          </div>
          <div className="textBlock-body" ref={callbackResponseRef}>
            <div dangerouslySetInnerHTML={{ __html: detailsHtml }} />
          </div>
        </div>
      </div>
    ):(
      <p>Loding data...</p>
    )}
  </>
);
}


export default Code_09P2Pcode