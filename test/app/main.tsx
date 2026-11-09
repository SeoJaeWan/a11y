import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { PageNotFound, resolvePage } from './routes';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

const Page = (await resolvePage(window.location.pathname)) ?? PageNotFound;

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
