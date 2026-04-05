/**
 * Konvertiert ein gegebenes HTML-Dokument (oder ein Fragment) in Markdown.
 * @param {Document|Element} root - Das Dokument-Objekt (z.B. dein newDoc)
 */
function convertToMarkdown(root) {
    const searchScope = root.body || root;
    const container = searchScope.querySelector('[data-purpose="bookmarks-container"]');
    
    if (!container) return "Fehler: 'bookmarks-container' nicht gefunden.";

    let markdown = "# Meine Kurs-Notizen\n\n";
    const notes = container.querySelectorAll('.lecture-bookmark-v2--row--kw-1I');

    notes.forEach((note) => {
        const duration = note.querySelector('.lecture-bookmark-v2--duration--itqnB')?.textContent.trim() || "0:00";
        const section = note.querySelector('.lecture-bookmark-v2--section--j0ti8')?.textContent.trim() || "";
        const lecture = note.querySelector('.ud-text-sm')?.textContent.trim() || "";
        const bodyContainer = note.querySelector('[data-purpose="bookmark-body"]');
        
        markdown += `## Notiz bei ${duration}\n`;
        markdown += `* **Zeitpunkt:** ${duration}\n`;
        markdown += `* **Sektion:** ${section}\n`;
        markdown += `* **Lektion:** ${lecture}\n\n`;

        if (bodyContainer) {
            markdown += processNode(bodyContainer, root);
        }

        markdown += "\n---\n\n";
    });

    return markdown;
}

function processNode(node, docContext) {
    let result = "";

    node.childNodes.forEach(child => {
        if (child.nodeType === 1) { // ELEMENT_NODE
            
            // 1. Spezielle Behandlung für Code-Blöcke
            if (child.classList.contains('ud-component--base-components--code-block') || child.tagName === 'PRE') {
                let codeText = "";
                
                // Prüfen, ob der Code in einer Liste (ol/li) strukturiert ist
                const lines = child.querySelectorAll('li');
                if (lines.length > 0) {
                    // Zeilen einzeln extrahieren und mit Newline verbinden
                    codeText = Array.from(lines)
                        .map(li => li.textContent) 
                        .join('\n');
                } else {
                    // Falls keine Liste da ist, nutzen wir innerText (respektiert meist <br>)
                    codeText = child.innerText || child.textContent;
                }

                result += `\n\`\`\`javascript\n${codeText}\n\`\`\`\n\n`;
            } 
            
            // 2. Überschriften
            else if (child.tagName === 'H4') {
                result += `### ${child.textContent.trim()}\n\n`;
            } 
            
            // 3. Paragraphen
            else if (child.tagName === 'P') {
                result += `${processInlineFormatting(child, docContext)}\n\n`;
            }
            
            // 4. Listen (normale Aufzählungen im Text)
            else if (child.tagName === 'UL' || child.tagName === 'OL') {
                child.querySelectorAll('li').forEach(li => {
                    result += `* ${processInlineFormatting(li, docContext)}\n`;
                });
                result += "\n";
            }
            
            else {
                result += processNode(child, docContext);
            }
        }
    });

    return result;
}

function processInlineFormatting(element, docContext) {
    let html = element.innerHTML;
    html = html.replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
               .replace(/<b>(.*?)<\/b>/gi, '**$1**')
               .replace(/<code>(.*?)<\/code>/gi, '`$1`');
    
    const temp = (docContext.createElement ? docContext : document).createElement('div');
    temp.innerHTML = html;
    return temp.textContent.trim();
}

function downloadMarkdown(markdownText, filename = 'kurs-notizen.md') {
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

let newDoc=document.implementation.createHTMLDocument(document.title)
const notes = document.querySelector('div[data-purpose="bookmarks-container"]');
const btns = notes.querySelectorAll('button');
btns.forEach(b => b.remove());
newDoc.body.append(notes);
const markdown=convertToMarkdown(newDoc);

downloadMarkdown(markdown);