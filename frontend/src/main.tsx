/** React */
import { StrictMode } from 'react';

/** React router */
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

/** Styles */
import 'styles/index.css';

/** router */
import router from './routes/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
