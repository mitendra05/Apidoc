import React, { useRef} from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeSnippets = {
  response: `Sample Webhook Response

{
   "transaction_id": "ASAQWQWAS2111111AAA11",
   "status": "Success",
   "amount": 10,
   "currency": "USD",
   "email": "abc@gmail.com",
   "mode": "card",
   "phone": "xxxxxxxxxx",
   "orderNumber": "01210",
   "name": "abc",
   "message": "Transaction Completed Successfully"
}`,
};

function Webhook() {
  const codeBlockRef = useRef(null);

  return (
    <>
      <div className="textBlock">
        <div className="textBlock-header">
          <h1>Webhook Response</h1>
        </div>
        <div className="textBlock-body" ref={codeBlockRef}>
          <pre>
            <SyntaxHighlighter
              language="json"
              style={solarizedlight}
              customStyle={{ background: "transparent", padding: 0 }}
            >
              {codeSnippets.response}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>
    </>
  );
}

export default Webhook;
