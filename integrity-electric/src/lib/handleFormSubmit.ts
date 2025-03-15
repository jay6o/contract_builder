import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const wrapText = (text, font, maxWidth, fontSize) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  lines.push(currentLine); // Push the last line
  return lines;
};

const handleFormSubmit = async (e, date, location, cost, client, tasks) => {
  e.preventDefault();
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 600;
  const pageHeight = 800;
  const margin = 50;

  // Embed a font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Load and embed the banner image
  const bannerImageBytes = await fetch("/banner.png").then(res => res.arrayBuffer());
  const bannerPdfImage = await pdfDoc.embedPng(bannerImageBytes);

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let cursorY = pageHeight - margin;

  const lineHeight = 16;
  const fontSize = 11;

  // Function to add a new page if content exceeds the current page
  const addNewPageIfNeeded = () => {
    if (cursorY < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      cursorY = pageHeight - margin;
    }
  };

  // Calculate banner dimensions and position
  const bannerWidth = 300; // Adjust as needed
  const bannerHeight = bannerPdfImage.height * (bannerWidth / bannerPdfImage.width);
  const bannerX = (pageWidth - bannerWidth) / 2;
  const bannerY = pageHeight - margin - bannerHeight;

  // Draw the banner image
  page.drawImage(bannerPdfImage, {
    x: bannerX,
    y: bannerY,
    width: bannerWidth,
    height: bannerHeight,
  });

  // Adjust cursorY for the text below the banner
  cursorY = bannerY - lineHeight * 2;

  // Draw header
  page.drawText(`WORK CONTRACT`, {
    x: margin /*(pageWidth - font.widthOfTextAtSize("Contract Details", fontSize)) / 2*/,
    y: cursorY,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  });
  cursorY -= lineHeight * 2;

  // Draw form data
const formDataLines = [
  `JOB LOCATION: ${location}`,
  `DATE: ${date}`,
  `Scope of work for a total cost of $${cost}`,
  "",
  "Will perform the work as follows:"
];

formDataLines.forEach((line) => {
  addNewPageIfNeeded();
  if (line == formDataLines[1]) {
  	page.drawText(line, { x: (page.getWidth() - font.widthOfTextAtSize(line, fontSize) - margin), y: cursorY + lineHeight, size: fontSize });
  } else {
  	page.drawText(line, { x: margin, y: cursorY, size: fontSize });
  	cursorY -= lineHeight;
  }
});

  // Draw tasks
  tasks.forEach((task) => {
	const bulletText = `\u2022  ${task}`;
    const taskLines = wrapText(
      bulletText,
      font,
      pageWidth - margin * 2,
      fontSize
    );

    taskLines.forEach((line) => {
      addNewPageIfNeeded();
      page.drawText(line, { x: margin + 20, y: cursorY, size: fontSize, font:font });
      cursorY -= lineHeight;
    });
  });

  
  // Add signature line at the bottom of the last page
  const signatureLineHeight = lineHeight * 2;
  const spaceNeeded = signatureLineHeight + margin;

  if (cursorY - spaceNeeded < margin) {
    // Add a new page if there's not enough space
    page = pdfDoc.addPage([pageWidth, pageHeight]);
  }

  // Position the signature line at the bottom of the page
  cursorY = margin + signatureLineHeight;

  page.drawText("Signature: __________________", { 
    x: margin, 
    y: cursorY, 
    size: fontSize + 2, 
    font: boldFont
  });

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Create a Blob and trigger download
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${client}_contract.pdf`;
  link.click();
};

export default handleFormSubmit;
