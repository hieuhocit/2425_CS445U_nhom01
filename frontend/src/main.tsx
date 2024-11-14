/** React */
import { StrictMode } from 'react';

/** React router */
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

/** Store */
import { Provider } from 'react-redux';
import store from './store/store';

/** Styles */
import 'styles/index.scss';

/** router */
import router from './routes/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
