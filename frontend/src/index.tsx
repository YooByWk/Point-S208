<<<<<<< HEAD
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
=======
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './index.css'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
>>>>>>> 77353f4921c19c50e62742b4849d0f23376dc52a
