import React, { useRef, useState, useEffect  } from "react";

function Errorcode() {
  const [apiData, setApiData] = useState(null);
	const [detailsHtml, setDetailsHtml] = useState(null);

  useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await fetch("https://centpays.com/apidoc/details/17");
			const data = await response.json();
			setApiData(data);
			// console.log(data);
			if (data && data.data && data.data.length > 0) {
			  setDetailsHtml(data.data[0].details);
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
      <div className="error-textBlock">
        <div className="textBlock-header">
          <h1>HTTP Status Code Summary</h1>
        </div>

        <div className="textBlock-body" >
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

export default Errorcode;
