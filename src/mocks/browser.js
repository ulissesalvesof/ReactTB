import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configurar o Mock Service Worker para o navegador
export const worker = setupWorker(...handlers);
