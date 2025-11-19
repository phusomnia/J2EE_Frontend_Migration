export const printHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print CV</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            width: 210mm;
            min-height: 297mm;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            #print-root {
              width: 100%;
              height: 100%;
            }
          }

          ul,
          ol {
            list-style: none;
            padding-left: 0;
            margin-left: 0;
          }

          li[data-list="bullet"] {
            position: relative;
            padding-left: calc(10px * var(--scale));
          }

          li[data-list="bullet"]::before {
            content: "•";
            position: absolute;
            left: 0;
            top: 0;
          }
        </style>
      </head>
      <body>
        <div id="print-root"></div>
      </body>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </html>
  `;
