import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (file) => {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onload = async () => {
      const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        text += strings.join(" ");
      }
      resolve(text);
    };
    reader.readAsArrayBuffer(file);
  });
};