import React, { useRef, useState, useEffect } from "react";
import checkimg from "../images/checkmark.png";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yDark,
  solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import ruby from "../images/ruby.png";
import python from "../images/python.png";
import php from "../images/php.png";
import java from "../images/java.png";
import node from "../images/node.png";
import net from "../images/net.png";
import react from "../images/react.png";

const codeSnippets = {
  baseUrl: `"https://centpays.com"`,
  ruby: `require 'net/http'
require 'json'
  
# API endpoint URL
api_url = 'https://api.example.com/data'
  
# Your API key or authentication token
api_key = 'your_api_key'
  
# Construct the full URL with parameters if needed
full_url = "#{api_url}?param1=value1&param2=value2"
  
# Initialize Net::HTTP session
uri = URI(full_url)
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true # Enable SSL if needed
  
# Construct the request
request = Net::HTTP::Get.new(uri)
request['Authorization'] = "Bearer #{api_key}"
  
# Execute the request and get the response
response = http.request(request)
  
# Check for HTTP errors
if response.code.to_i == 200
  response_data = JSON.parse(response.body)
  
  # Handle the API response as needed
  if response_data
    # Successful response, process the data
    p response_data
  else
    # Unable to parse JSON response
    puts 'Error decoding JSON response.'
  end
else
  # Error in the HTTP request
  puts "Error: #{response.code} - #{response.message}"
end`,
  python: `import requests

# API endpoint URL
api_url = 'https://api.example.com/data'
  
# Your API key or authentication token
api_key = 'your_api_key'
  
# Construct the full URL with parameters if needed
full_url = f'{api_url}?param1=value1&param2=value2'
  
# Set headers with authentication
headers = {'Authorization': f'Bearer {api_key}'}
  
# Make the HTTP GET request
response = requests.get(full_url, headers=headers)
  
# Check for HTTP errors
if response.status_code == 200:
  response_data = response.json()
  
  # Handle the API response as needed
  if response_data:
    # Successful response, process the data
    print(response_data)
  else:
    # Unable to parse JSON response
    print('Error decoding JSON response.')
else:
  # Error in the HTTP request
  print(f'Error: {response.status_code} - {response.text}')`,
  php: `<?php
// API endpoint URL
$apiUrl = 'https://api.example.com/data';

// Your API key or authentication token
$apiKey = 'your_api_key';

// Construct the full URL with parameters if needed
$fullUrl = $apiUrl . '?param1=value1&param2=value2';

// Initialize cURL session
$ch = curl_init($fullUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  // Add your authentication header if required
  'Authorization: Bearer ' . $apiKey,
]);

// Execute cURL session and get the response
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
  echo 'Error: ' . curl_error($ch);
}

// Close cURL session
curl_close($ch);

// Process the API response
if ($response) {
  $responseData = json_decode($response, true);

  // Handle the API response as needed
  if ($responseData) {
    // Successful response, process the data
    var_dump($responseData);
  } 
  else {
    // Unable to decode JSON response
    echo 'Error decoding JSON response.';
  }
} 
else {
    // No response received from the API
    echo 'No response from the API.';
}
?>`,
  java: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Main {
  public static void main(String[] args) {
    // API endpoint URL
    String apiUrl = "https://api.example.com/data";

    // Your API key or authentication token
    String apiKey = "your_api_key";

    // Construct the full URL with parameters if needed
    String fullUrl = apiUrl + "?param1=value1&param2=value2";

    try {
      // Create URL object
      URL url = new URL(fullUrl);

      // Open connection
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();

      // Set request method
      connection.setRequestMethod("GET");

      // Set headers with authentication
      connection.setRequestProperty("Authorization", "Bearer " + apiKey);

      // Get the response code
      int responseCode = connection.getResponseCode();

      // Check for HTTP 200 OK
      if (responseCode == HttpURLConnection.HTTP_OK) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        // Read the response
        StringBuilder response = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
          response.append(line);
        }
        reader.close();

        // Process the API response as needed
        String responseData = response.toString();
        System.out.println(responseData);
      } 
      else {
        // Error in the HTTP request
        System.out.println("Error: " + responseCode + " - " + connection.getResponseMessage());
      }

      // Close connection
      connection.disconnect();

    } 
    catch (IOException e) {
      e.printStackTrace();
    }
  }
}`,
  node: `const http = require('http');
const querystring = require('querystring');
  
// API endpoint URL
const apiUrl = 'https://api.example.com/data';
  
// Your API key or authentication token
const apiKey = 'your_api_key';
  
// Construct the full URL with parameters if needed
const queryParams = {
  param1: 'value1',
  param2: 'value2',
};
  
const fullUrl = '\${apiUrl}?\${querystring.stringify(queryParams)}';
  
// Set headers with authentication
const headers = {
  'Authorization': 'Bearer \${apiKey}',
};
  
// Options for the HTTP request
const options = {
  method: 'GET',
  headers: headers,
};
  
// Make the HTTP GET request
const req = http.request(fullUrl, options, (res) => {
  let responseData = '';
  
  // Accumulate the response data
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  // Process the API response when the response ends
  res.on('end', () => {
    // Check for HTTP 200 OK
    if (res.statusCode === 200) {
      // Parse and process the JSON response
      try {
        const parsedData = JSON.parse(responseData);
        console.log(parsedData);
      } catch (error) {
        console.error('Error parsing JSON response:', error.message);
      }
    } 
    else {
      // Error in the HTTP request
      console.error('Error: \${res.statusCode} - \${res.statusMessage}');
    }
  });
});
  
// Handle errors during the HTTP request
req.on('error', (error) => {
  console.error('Error during HTTP request:', error.message);
});
  
// End the HTTP request
req.end();`,
  net: `using System;
using System.Net.Http;
using System.Threading.Tasks;
  
class Program {
  static async Task Main()
  {
    // API endpoint URL
    string apiUrl = "https://api.example.com/data";
  
    // Your API key or authentication token
    string apiKey = "your_api_key";
  
    // Construct the full URL with parameters if needed
    string fullUrl = $"{apiUrl}?param1=value1&param2=value2";
  
    using (HttpClient client = new HttpClient())
    {
      // Set headers with authentication
      client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
  
      try
      {
        // Make the HTTP GET request
        HttpResponseMessage response = await client.GetAsync(fullUrl);
  
        // Check for HTTP 200 OK
        if (response.IsSuccessStatusCode)
        {
          // Read and display the response
          string responseData = await response.Content.ReadAsStringAsync();
          Console.WriteLine(responseData);
        }
        else
        {
          // Handle error in the HTTP request
          Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
        }
      }
      catch (Exception ex)
      {
        // Handle any other errors
        Console.WriteLine($"Error during API request: {ex.Message}");
      }
    }
  }
}`,
  react: `import React, { useEffect } from 'react';

const YourComponent = () => {
  useEffect(() => {
    // API endpoint URL
    const apiUrl = 'https://api.example.com/data';
  
    // Your API key or authentication token
    const apiKey = 'your_api_key';
  
    // Construct the full URL with parameters if needed
    const fullUrl = '\${apiUrl}?param1=value1&param2=value2';
  
    const fetchData = async () => {
      try {
        // Make the HTTP GET request
        const response = await fetch(fullUrl, {
          headers: {
            Authorization: 'Bearer \${apiKey}',
          },
        });
  
        // Check for HTTP 200 OK
        if (response.ok) {
          // Read and display the response
          const responseData = await response.json();
          console.log(responseData);
        } 
        else {
          // Handle error in the HTTP request
          console.error('Error: \${response.status} - \${response.statusText}');
        }
      } 
      catch (error) {
        // Handle any other errors
        console.error('Error during API request: \${error.message}');
      }
    };
  
    fetchData();
  }, []); // Empty dependency array means this effect will run once when the component mounts
  
  return (
    <div>
      {/* Your React component content goes here */}
    </div>
  );
};
  
export default YourComponent;`,
};

const supportedLanguages = [
  { id: "ruby", name: "Ruby", icon: ruby },
  { id: "python", name: "Python", icon: python },
  { id: "php", name: "PHP", icon: php },
  { id: "java", name: "Java", icon: java },
  { id: "node", name: "Node.js", icon: node },
  { id: "net", name: ".net", icon: net },
  { id: "react", name: "React", icon: react },
];

const IntroCode = () => {
  const baseUrlRef = useRef(null);
  const codeBlockRef = useRef(null);
  const [isCopiedCode, setIsCopiedCode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    const initialStatus = supportedLanguages.reduce((acc, language) => {
      acc[language.id] = false;
      return acc;
    }, {});
    setIsCopiedCode(initialStatus);
    setSelectedLanguage("ruby");
  }, []);

  const handleCopyClick = (contentRef, languageId) => {
    if (contentRef && contentRef.current) {
      const range = document.createRange();
      range.selectNode(contentRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      setIsCopiedCode((prevStatus) => ({
        ...prevStatus,
        [languageId]: true,
      }));

      setTimeout(() => {
        setIsCopiedCode((prevStatus) => ({
          ...prevStatus,
          [languageId]: false,
        }));
      }, 1500);
    }
  };

  return (
    <>
      {/* BASE URL */}
      <div className="codeBlock">
        <div className="codeBlock-header">
          <h1>BASE URL</h1>
          <i
            className="fa-regular fa-clipboard"
            onClick={() => handleCopyClick(baseUrlRef, "baseUrl")}
          ></i>
          {isCopiedCode["baseUrl"] && (
            <span className="copied-message">
              <p>
                <img src={checkimg} className="icon" alt="check icon" />
                Copied!
              </p>
            </span>
          )}
        </div>
        <div className="codeBlock-body" ref={baseUrlRef}>
          <pre>
            <SyntaxHighlighter
              language="http"
              style={a11yDark}
              customStyle={{ background: "transparent", padding: 0 }}
            >
              {codeSnippets.baseUrl}
            </SyntaxHighlighter>
          </pre>
        </div>
      </div>

      {/* CLIENT LIBRARIES */}
      {/* <div className="textBlock">
        <div className="textBlock-header">
          <h1>CLIENT LIBRARIES</h1>
          <ul className="textBlock-header-languages">
            {supportedLanguages.map((language) => (
              <li
                key={language.id}
                onClick={() => setSelectedLanguage(language.id)}
              >
                <img src={language.icon} className="icon" alt={language.id} />{" "}
                <br />
                {language.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="textBlock-body" ref={codeBlockRef}>
          {isCopiedCode[selectedLanguage] && (
            <span className="copied-message">
              <p>
                <img src={checkimg} className="icon" alt="check icon" />
                Copied!
              </p>
            </span>
          )}
          <div className="textBlock-body-copyHeading">
            {selectedLanguage && (
              <p
                onClick={() => handleCopyClick(codeBlockRef, selectedLanguage)}
              >
                CENTPAYS - {selectedLanguage.toUpperCase()}{" "}
                <i
                  className="fa-regular fa-clipboard"
                  onClick={() =>
                    handleCopyClick(codeBlockRef, selectedLanguage)
                  }
                ></i>
              </p>
            )}
          </div>
          <div>
            <pre>
              {selectedLanguage && (
                <SyntaxHighlighter
                  language={selectedLanguage}
                  style={solarizedlight}
                  customStyle={{ background: "transparent", padding: 0 }}
                >
                  {codeSnippets[selectedLanguage]}
                </SyntaxHighlighter>
              )}
            </pre>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default IntroCode;
