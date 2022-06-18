import React from 'react';
import {ApplicationContextProvider, SecurityContextProvider} from './context';
import ApplicationLayout from './layouts';

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
     <ApplicationContextProvider>
        <SecurityContextProvider>
          <BrowserRouter>
            <ApplicationLayout />
          </BrowserRouter>
        </SecurityContextProvider>
     </ApplicationContextProvider>
  );
}

export default App;
