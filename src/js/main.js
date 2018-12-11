import Promise from 'promise-polyfill';
import PrintPdf from './modules/PrintPdf';

document.getElementById('print').addEventListener('click', () => {
  if (!window.Promise) {
    window.Promise = Promise;
  }

  let printObj = new PrintPdf();
  printObj.createPdf();
});
