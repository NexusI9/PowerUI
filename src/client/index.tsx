//   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')import React from 'react';

import { createRoot } from 'react-dom/client';
import App from './App';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('powerui-app');
  const root = container && createRoot(container);
  root?.render(<App />);
});