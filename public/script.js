const fileList = document.getElementById('file-list');
const fileContent = document.getElementById('file-content');

function listFiles() {
  fetch('/files')
    .then(response => response.json())
    .then(files => {
      files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file;
        fileList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching file list:', error);
      // Handle error, e.g., display an error message to the user
    });
}

function summarizeText(text) {
  return text.split('\n').map(line => line.split(' ').map(word => word[0]).join('')).join('<br>');
}

function displayContent(fileName) {
  fetch(`/files/${fileName}`)
    .then(response => response.text())
    .then(content => {
      if (isSummaryView) {
        content = summarizeText(content);
      }
      fileContent.innerHTML = `<pre>${content}</pre>`;
      currentFileName = fileName; // Store current file name for re-display
    })
    .catch(error => {
      console.error('Error fetching file content:', error);
      // Handle error, e.g., display an error message to the user
    });
}

let isSummaryView = false;

const buttonContainer = document.getElementById('button-container');

const viewModeToggle = document.createElement('button');
viewModeToggle.textContent = 'first letter mode';
viewModeToggle.addEventListener('click', toggleViewMode);

buttonContainer.appendChild(viewModeToggle);
// const buttonContainer = document.getElementById('button-container');

// const viewModeToggle = document.createElement('button');
// viewModeToggle.textContent = 'first letter mode';
// viewModeToggle.addEventListener('click', toggleViewMode);

document.body.appendChild(viewModeToggle);

function toggleViewMode() {
  isSummaryView = !isSummaryView;
  displayContent(currentFileName);
}

fileList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const fileName = event.target.textContent;
    displayContent(fileName);
  }
});


// draft reveal only one line at a time
// const revealButton = document.createElement('button');
// revealButton.textContent = 'Reveal Line';
// buttonContainer.appendChild(revealButton);

// let currentLine = 0;

// revealButton.addEventListener('click', () => {
//   if (isSummaryView) {
//     const lines = fullText.split('\n');
//     if (currentLine < lines.length) {
//       fileContent.textContent += lines[currentLine];
//       currentLine++;
//     }
//   }
// });


listFiles();

