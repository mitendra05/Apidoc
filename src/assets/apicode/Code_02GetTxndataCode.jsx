import React, { useRef, useState, useEffect  } from "react";
import checkimg from "../images/checkmark.png";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yDark,
  solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const codeSnippets = {
  requestedURL: `POST "https://centpays.com/v2/get_transaction/"`,
  header: `{
  "api-key": "YOUR_API_KEY",
  "api-secret": "YOUR_API_SECRET",
  "Content-Type": "application/json"
}`,

  request: `Value assign in Request body is only for example

{
  "transaction_id": "TRANSACTION-ID"
}`,

  response: `Sample Response body

{
  "code": 202,
  "status": "Success",
  "message": "Transaction processed successfully",
  "data": {
     "transaction_id": "h6bhd8d9dkdkj",
     "status": "Success",
     "amount": "100",
     "currency": "USD",
     "email": "abc@gmail.com",
     "mode": "UPI",
     "phone": "",
     "orderNumber": "",
     "name": "",
     "message": "message."
   }
}`,
};

function Getdatacode() {
  const[apiData,setApiData] = useState(false);
  const [headerHtml, setHeaderHtml] = useState(null);
	const [requestHtml, setRequestHtml] = useState(null);
	const [responseHtml, setResponseHtml] = useState(null);

  const requestedURLRef = useRef(null);
  const headerRef = useRef(null);
  const requestRef = useRef(null);
  const responseRef = useRef(null);
 
  const [isCopiedBaseURL, setIsCopiedBaseURL] = useState(false);
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
			const response = await fetch("https://centpays.com/apidoc/details/15");
			const data = await response.json();
			setApiData(data);
			// console.log(data);
			if (data && data.data && data.data.length > 0) {
			  setHeaderHtml(data.data[0].header);
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
            onClick={() =>
              handleCopyClick("BaseURL", requestedURLRef, setIsCopiedBaseURL)
            }
          ></i>
          {isCopiedBaseURL && (
            <span className="copied-message">
              <p>
                <img src={checkimg} className="icon" alt="check icon" />
                Copied!
              </p>
            </span>
          )}
        </div>
        <div className="codeBlock-body" ref={requestedURLRef}>
							{apiData.data[0].url}
						</div>
      </div>

      <div className="codeBlock">
        <div className="codeBlock-header">
          <h1>Header</h1>
          <i
            className="fa-regular fa-clipboard"
            onClick={() =>
              handleCopyClick("Header", headerRef, setIsCopiedHeader)
            }
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
            onClick={() =>
              handleCopyClick("Request", requestRef, setIsCopiedRequest)
            }
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
        <div style={{overflow:"auto"}} className="codeBlock-body" ref={requestRef}>
							<div dangerouslySetInnerHTML={{ __html: requestHtml }} />
						</div>
      </div>

      <div className="textBlock">
        <div className="textBlock-header">
          <h1>Response</h1>
        </div>

        <div className="textBlock-body" ref={responseRef}>
        <pre>
            <SyntaxHighlighter
              language="json"
              style={solarizedlight}
              customStyle={{ background: "transparent", padding: 0 }}
            >
              {codeSnippets.response}
            </SyntaxHighlighter>
          </pre>
							{/* <div dangerouslySetInnerHTML={{ __html: responseHtml }} /> */}
						</div>
        </div>

        </div>
      ):(
      <p>Loding data...</p>
    )}
      
    </>
  );
}

export default Getdatacode;
