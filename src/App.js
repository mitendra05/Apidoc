import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import APIdoc from './assets/Apidoc';

function App() {
  return (
    <>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<APIdoc />} />
			</Routes>
		</BrowserRouter>
    </>
  );
}

export default App;
