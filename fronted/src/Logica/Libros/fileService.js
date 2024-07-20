// fileService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const downloadPdf = async (rutaPdf) => {
  try {
    const filename = rutaPdf.split('/').pop();
    const response = await axios({
      url: `${BASE_URL}/descargar-pdf/${filename}`,
      method: 'GET',
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    throw new Error('Error downloading PDF:', error);
  }
};

export const viewPdf = (rutaPdf) => {
  const pdfUrl = `${BASE_URL}/descargar-pdf/${rutaPdf.split('/').pop()}`;
  window.open(pdfUrl, '_blank');
};
