import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default class PrintPdf {
  constructor() {
    this.pdf = new jsPDF('p', 'mm', 'a4');
  }

  createPdf() {
    // -------------------------------------------------------------------------
    // jsPDF addSvgAsImage()
    // -------------------------------------------------------------------------

    let svgElement = document.getElementById('circle');
    // Using XMLSerializer beacause outerHTML does not work in Internet Explorer 
    let svgElementSrc = new XMLSerializer().serializeToString(svgElement);
    this.pdf.addSvgAsImage(svgElementSrc, 0, 0, 100, 100, '', 'NONE');

    // -------------------------------------------------------------------------
    // html2canvas approach
    // -------------------------------------------------------------------------
    // It does not work with direct SVG element, must take its parent
    let svgElementContainer = document.querySelector('.container');
    html2canvas(svgElementContainer, {
      scale: 3,
      logging: true,
    }).then(canvas => {
      let svgFromCanvas = canvas.toDataURL('image/png');
      this.pdf.addImage(svgFromCanvas, 'PNG', 0, 110, 100, 100, '', 'NONE');
      this.pdf.save('circle.pdf');
    });
  } // createPdf()
} // PrintPdf
