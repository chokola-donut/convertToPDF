const { jsPDF } = window.jspdf;
let doc = new jsPDF();
let yOffset = 20; 
let yOffset1 = 20
function initializeDoc() {
    doc = new jsPDF();
    yOffset = 20;        
}
function checkPageBreak() {
    const pageHeight = doc.internal.pageSize.height; 
    if (yOffset > pageHeight - 20) { 
        doc.addPage();
        yOffset = 20; 
        yOffset1 = 20
    }
}
function checkPageBreakForPre() {
    const pageHeight = doc.internal.pageSize.height; 
    if (yOffset > pageHeight - 20) { 
        doc.addPage();
        yOffset = 20; 
        yOffset1 = 20
    }
}
//titlejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
function addTitles(titles) {
    const titleStyle = {
        fontSize: 24,
        halign: 'center'
    };
    doc.setFontSize(titleStyle.fontSize);   
    titles.forEach((title) => {
        checkPageBreak()
        doc.text(title.innerText, 105, yOffset, { align: titleStyle.halign });
        yOffset += 10; 
        });
}
// h2jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
function addsubtitle(stitle){
const stitlestyle={
    fontSize:15,
    halign:'right',
}
  
    doc.setFontSize(stitlestyle.fontSize)
    stitle.forEach((stitl) => {
        checkPageBreak()
        doc.text(stitl.innerText, 105, yOffset, { align: stitlestyle.halign });
        yOffset += 10; 
    })
}
//h3jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
function addsubsubtitle(s_stitle){
    const s_stitlestyle={
        fontSize:13.5,
        halign:'right',
    }
    doc.setFontSize(s_stitlestyle.fontSize)
    s_stitle.forEach((s_stitl) => {
        checkPageBreak()
        doc.text(s_stitl.innerText, 105, yOffset, { align: s_stitlestyle.halign });
        yOffset += 10; 
    })
}
//h4jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
function addsub2subtitle(s2_stitle){
    const s2_stitlestyle={
        fontSize:12,
        halign:'center',
    }
    doc.setFontSize(s2_stitlestyle.fontSize)
    s2_stitle.forEach((s2_stitl) => {
        checkPageBreak()
        doc.text(s2_stitl.innerText, 105, yOffset, { align: s2_stitlestyle.halign });
        yOffset += 10; 
    })
}

//PARAGRAPHjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
function addParagraphs(paragraphs) {
    const paragraphStyle = {
        fontSize: 12,
        maxWidth: 180
    };

    doc.setFontSize(paragraphStyle.fontSize);
    let xOffset = 10; 

    paragraphs.forEach((paragraph) => {
        Array.from(paragraph.childNodes).forEach((node) => {
            checkPageBreak();

            if (node.nodeType === Node.TEXT_NODE) {
                const textLines = doc.splitTextToSize(node.textContent, paragraphStyle.maxWidth - xOffset);
                textLines.forEach((line) => {
                    if (xOffset + doc.getTextWidth(line) > paragraphStyle.maxWidth) { 
                        yOffset += 7; 
                        xOffset = 10; 
                    }
                    doc.text(line, xOffset, yOffset);
                    xOffset += doc.getTextWidth(line);
                });
            } else if (node.tagName === 'EM') {
                const italicText = doc.splitTextToSize(node.textContent, paragraphStyle.maxWidth - xOffset);
                doc.addFont("fonts/Roboto-italic.ttf", "CustomFont2", "normal");
                doc.setFont('CustomFont2');

                italicText.forEach((line) => {
                    if (xOffset + doc.getTextWidth(line) > paragraphStyle.maxWidth) { 
                        yOffset += 7; 
                        xOffset = 10; 
                    }
                    doc.text(line, xOffset, yOffset);
                    xOffset += doc.getTextWidth(line);
                });

                doc.setFont('CustomFont');
            } else if (node.tagName === 'STRONG' && node.children.length === 0) {
                const boldText = doc.splitTextToSize(node.textContent, paragraphStyle.maxWidth - xOffset);
                doc.addFont("fonts/Roboto-Bold.ttf", "CustomFont1", "normal");
                doc.setFont('CustomFont1');

                boldText.forEach((line) => {
                    if (xOffset + doc.getTextWidth(line) > paragraphStyle.maxWidth) { 
                        yOffset += 7; 
                        xOffset = 10; 
                    }
                    doc.text(line, xOffset, yOffset);
                    xOffset += doc.getTextWidth(line);
                });

                doc.setFont('CustomFont');
            } else if (node.tagName === 'STRONG' && node.children.length > 0 && node.children[0].tagName === 'EM') {
                const boldItalicText = doc.splitTextToSize(node.textContent, paragraphStyle.maxWidth - xOffset);
                doc.addFont("fonts/Roboto-Bolditalic.ttf", "CustomFont3", "normal");
                doc.setFont('CustomFont3');

                boldItalicText.forEach((line) => {
                    if (xOffset + doc.getTextWidth(line) > paragraphStyle.maxWidth) { 
                        yOffset += 7; 
                        xOffset = 10; 
                    }
                    doc.text(line, xOffset, yOffset);
                    xOffset += doc.getTextWidth(line);
                });

                doc.setFont('CustomFont');
            }
        });

       
        xOffset = 10;
        yOffset += 10;
    });
}

function addN_list(Lit){
const lisstyle={
    fontSize:12,
    maxWidth:180,
}
doc.setFontSize(lisstyle.fontSize);
let listIndex = 1; 
let xOffset = 10; 

Lit.forEach((item) => {
    checkPageBreak();

    
    const textLines = doc.splitTextToSize(`${listIndex}.${item.innerText}`, lisstyle.maxWidth);
    
    textLines.forEach((line, lineIndex) => {
        if (lineIndex === 0) {
            doc.text(`${listIndex}.`, xOffset, yOffset);
            doc.text(line.slice((`${listIndex}.` ).length), xOffset + 10, yOffset);
        } else {
            doc.text(line, xOffset + 10, yOffset); 
        }
        yOffset += 7;
    });

    listIndex++; 
    yOffset += 5;
});
}

function addUn_List(lit1) {
    const listStyle = {
        fontSize: 12,
        maxWidth: 180
    };

    doc.setFontSize(listStyle.fontSize);
    const bullet = "\u2022"; 
    let xOffset = 10;

    lit1.forEach((item) => {
        checkPageBreak();

        
        const textLines = doc.splitTextToSize(item.innerText, listStyle.maxWidth);
        
        textLines.forEach((line, lineIndex) => {
            if (lineIndex === 0) {
                doc.text(`${bullet}`, xOffset, yOffset); 
                doc.text(line, xOffset + 10, yOffset);
            } else {
                doc.text(line, xOffset + 10, yOffset); 
            }
            yOffset += 8;
        });

        yOffset += 2;
    });
}

//NOTEjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//упростить код
function addBoxes(boxes) {
    checkPageBreak()
    let yOffset1 = yOffset
    let xOffset =20;
    const lineStyle = {
        lineWidth: 2,
        lineColor: [[179, 179, 179],[142, 126, 231],[0, 170, 255],[255, 136, 0],[140, 166, 217],[255, 128, 128]] 
    }
    const textStyle = {
        fontSize: 12,
        maxWidth: 180,
    } 
    
    if(boxes[0].classList.contains('admonition-quote')){
 
            doc.setLineWidth(lineStyle.lineWidth);
            doc.setDrawColor(lineStyle.lineColor[0][0], lineStyle.lineColor[0][1], lineStyle.lineColor[0][2]);
            doc.setFontSize(textStyle.fontSize);

            const textLines = doc.splitTextToSize(boxes[0].innerText, textStyle.maxWidth);
            textLines.forEach((line) => {
                if (xOffset + doc.getTextWidth(line) >= textStyle.maxWidth) { 
                    yOffset += 7; 
                    xOffset = 15; 
                }
               
                doc.text(line, xOffset, yOffset);
                xOffset += doc.getTextWidth(line);
         
            });
            if(textLines.length<=1){
                doc.line(10, yOffset-10, 10, yOffset+10); 
            }else{
                doc.line(10, yOffset+10, 10, yOffset1-10); 
            }
            yOffset += 30; 
            boxes.shift()
        
    }else if(boxes[0].classList.contains('admonition-lab')){
       
            doc.setLineWidth(lineStyle.lineWidth);
            doc.setDrawColor(lineStyle.lineColor[1][0], lineStyle.lineColor[1][1], lineStyle.lineColor[2][2]);
            doc.setFontSize(textStyle.fontSize);

            const textLines = doc.splitTextToSize(boxes[0].innerText, textStyle.maxWidth);
            textLines.forEach((line) => {
                if (xOffset + doc.getTextWidth(line) >= textStyle.maxWidth) { 
                    yOffset += 7; 
                    xOffset = 15; 
                }
               
                doc.text(line, xOffset, yOffset);
                xOffset += doc.getTextWidth(line);
         
            });
            if(textLines.length<=1){
                doc.line(10, yOffset-10, 10, yOffset+10); 
            }else{
                doc.line(10, yOffset+10, 10, yOffset1-10); 
            }
            yOffset += 30; 
            boxes.shift()
        
        }
        else if(boxes[0].classList.contains('admonition-tip')){
        
            doc.setLineWidth(lineStyle.lineWidth);
            doc.setDrawColor(lineStyle.lineColor[2][0], lineStyle.lineColor[2][1], lineStyle.lineColor[2][2]);
            doc.setFontSize(textStyle.fontSize);

            const textLines = doc.splitTextToSize(boxes[0].innerText, textStyle.maxWidth);
            textLines.forEach((line) => {
                if (xOffset + doc.getTextWidth(line) >= textStyle.maxWidth) { 
                    yOffset += 7; 
                    xOffset = 15; 
                }
               
                doc.text(line, xOffset, yOffset);
                xOffset += doc.getTextWidth(line);
         
            });
            if(textLines.length<=1){
                doc.line(10, yOffset-10, 10, yOffset+10); 
            }else{
                doc.line(10, yOffset+10, 10, yOffset1-10); 
            }
            yOffset += 30; 
            boxes.shift()

        }else if(boxes[0].classList.contains('admonition-note')){
 
            doc.setLineWidth(lineStyle.lineWidth);
            doc.setDrawColor(lineStyle.lineColor[3][0], lineStyle.lineColor[3][1], lineStyle.lineColor[3][2]);
            doc.setFontSize(textStyle.fontSize);

            const textLines = doc.splitTextToSize(boxes[0].innerText, textStyle.maxWidth);
            textLines.forEach((line) => {
                if (xOffset + doc.getTextWidth(line) >= textStyle.maxWidth) { 
                    yOffset += 7; 
                    xOffset = 15; 
                }
               
                doc.text(line, xOffset, yOffset);
                xOffset += doc.getTextWidth(line);
         
            });
            if(textLines.length<=1){
                doc.line(10, yOffset-10, 10, yOffset+10); 
            }else{
                doc.line(10, yOffset+10, 10, yOffset1-10); 
            }
            yOffset += 30; 
            boxes.shift()
            
        }else if(boxes[0].classList.contains('admonition-info')){
          
            doc.setLineWidth(lineStyle.lineWidth);
            doc.setDrawColor(lineStyle.lineColor[4][0], lineStyle.lineColor[4][1], lineStyle.lineColor[4][2]);
            doc.setFontSize(textStyle.fontSize);

            const textLines = doc.splitTextToSize(boxes[0].innerText, textStyle.maxWidth);
            textLines.forEach((line) => {
                if (xOffset + doc.getTextWidth(line) >= textStyle.maxWidth) { 
                    yOffset += 7; 
                    xOffset = 15; 
                }
               
                doc.text(line, xOffset, yOffset);
                xOffset += doc.getTextWidth(line);
         
            });
            if(textLines.length<=1){
                doc.line(10, yOffset-10, 10, yOffset+10); 
            }else{
                doc.line(10, yOffset+10, 10, yOffset1-10); 
            }
            yOffset += 30; 
            boxes.shift()
            
        }else if(boxes[0].classList.contains('admonition-danger')){
  
            doc.setLineWidth(lineStyle.lineWidth);
            doc.setDrawColor(lineStyle.lineColor[5][0], lineStyle.lineColor[5][1], lineStyle.lineColor[5][2]);

            doc.setFontSize(textStyle.fontSize);

            const textLines = doc.splitTextToSize(boxes[0].innerText, textStyle.maxWidth);
            textLines.forEach((line) => {
                if (xOffset + doc.getTextWidth(line) >= textStyle.maxWidth) { 
                    yOffset += 7; 
                    xOffset = 15; 
                }
               
                doc.text(line, xOffset, yOffset);
                xOffset += doc.getTextWidth(line);
         
            });
            if(textLines.length<=1){
                doc.line(10, yOffset-10, 10, yOffset+10); 
            }else{
                doc.line(10, yOffset+10, 10, yOffset1-10); 
            }
            yOffset += 30; 
            boxes.shift()
            
        }
    };

// TABLEjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
function addTable(tables){
    tables.forEach((table)=>{
 
       doc.autoTable({
        
    startY: yOffset,
    html: table, 
    theme:'grid' ,

    margin: { top: 10, bottom: 10, left: 10, right: 10 },
 
    styles: {  halign: 'center' } ,
    headStyles: {            
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        halign: 'center',
        lineWidth: border = 0.1,
border:{top:1, bottom: 0, left: 0, right: 0}

    }
})
    yOffset = doc.lastAutoTable.finalY + 20; 

if (yOffset + 20 > doc.internal.pageSize.height) {
    doc.addPage();
    yOffset = 10;
}; });
}
//CODEjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//доработать
function addPre(pres){
    let xOffset = 10
    const xOffset1 = xOffset
    const yOffset2 = yOffset
    const preStyle = {
        fontSize: 10,
        halign: 'left',
        maxWidth:180
    };
    
    doc.setFontSize(preStyle.fontSize);
    doc.addFont("fonts/CourierPrime-Regular.ttf", "CustomFontCourier", "normal");
    doc.setFont('CustomFontCourier');
    pres.forEach((pre) => {
    const textLines = doc.splitTextToSize(pre.innerText, preStyle.maxWidth-xOffset);
    console.log(textLines)
        textLines.forEach((line) => {
            yOffset += 10; 
            xOffset = 10; 
            doc.text(line, xOffset+10, yOffset,{ align: preStyle.halign });
            xOffset += doc.getTextWidth(line);
        });
            checkPageBreak()
            doc.rect(xOffset1,yOffset2,preStyle.maxWidth+10,yOffset-yOffset2)
            yOffset += 5;
            });
    
}

//IMAGESjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//доработать
function addImgs(imgs){
    imgs.forEach((img) => {
  
        const style = window.getComputedStyle(img);
        const width = parseFloat(style.width); 
        const height = parseFloat(style.height); 
     
        const canvas = document.createElement("canvas");
        canvas.width = width*4
        canvas.height = height*4
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0,width, height);

        const imgData = canvas.toDataURL("image/png"); 

        const pageWidth=doc.internal.pageSize.width

        const xOffset = Math.abs((pageWidth - width))/2;
        
        doc.addImage(imgData, "PNG", xOffset, yOffset, width, height);
        yOffset += height + 10;
    });
    
    
}

    
//RECURSIVECHECKjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

function a(el){
    if (el.classList.contains('title')) {
        addTitles([el]);
    } else if (el.classList.contains('paragraph')) {
        addParagraphs([el]);
    } else if (el.classList.contains('admonition')) {
        addBoxes([el]);
    } else if (el.classList.contains('stitl')|| el.tagName==="H2") {
        addsubtitle([el]);
    }
    else if (el.classList.contains('sstitl') || el.tagName==="H3") {
        addsubsubtitle([el]);
    }
    else if (el.classList.contains('s2stitl') || el.tagName==="H4") {
        addsub2subtitle([el]);
    }
    else if (el.tagName === 'OL') { 
        const Lit = Array.from(el.querySelectorAll('li')); 
        addN_list(Lit); 
    }
   
    else if (el.tagName === 'UL') { 
        const lit1 = Array.from(el.querySelectorAll('li')); 
        addUn_List(lit1)
    }
    else if (el.tagName === 'IMG') { 
        const imgs= Array.from(document.querySelectorAll('img')); 
        addImgs(imgs)
      
    }
    else if(el.tagName === 'PRE'){
        addPre([el])
    }

    else if (el.tagName === 'TABLE') { 
        const tables = document.querySelectorAll("table")
        addTable(tables)
    //      console.log(tables)
     
    }
    Array.from(el.children).forEach((child) => a(child));
}

//GENERATEjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
async function generatePDF() { 
    initializeDoc()
    doc.addFont("fonts/Roboto-Regular.ttf", "CustomFont", "normal"); 
    doc.setFont('CustomFont'); 
    const content = document.getElementById('content'); 
    Array.from(content.children).forEach((child) => a(child))
    doc.save('document.pdf');
}
document.getElementById('generatePDFButton').addEventListener('click', generatePDF);

