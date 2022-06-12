import React from 'react';
import SecurityContextProvider from './context';
import ApplicationLayout from './layouts';

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
     <SecurityContextProvider>
      <BrowserRouter>
       <ApplicationLayout />
      </BrowserRouter>
     </SecurityContextProvider>
  );
}

export default App;
