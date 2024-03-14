import React, { useState, useEffect } from 'react';

const Introduction = () => {
    const [apiData, setApiData] = useState(null);
    const [descriptionHtml, setDescriptionHtml] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://centpays.com/apidoc/details/12');
                const data = await response.json();
                setApiData(data);
				// console.log(data);
                if (data && data.data && data.data.length > 0) {
                    setDescriptionHtml(data.data[0].description);
                } else {
                    console.error('API response is missing expected data structure:', data);
                }

            } catch (error) {
                console.error('Error fetching API:', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <>
            {apiData ? (
                <div className="centpays-container">
                    <h2>{apiData.data[0].menu_name}</h2>
                    <div className="centpays-container-intro">
                        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Introduction;
