// I acknowledge that I used the assistance of ChatGPT for explanations, code generations, and comments for when I was having difficulties with this assignment.

import DictionaryService from './dictionaryService.js';

document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('searchForm');
  const storeForm = document.getElementById('storeForm');
  const definitionResult = document.getElementById('definitionResult');
  const responseBox = document.getElementById('response');
  const notification = document.getElementById('notification');

  // Handle storing new word and definition
  if (storeForm) {
    storeForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const word = document.getElementById('word').value;
      const definition = document.getElementById('definition').value;

      responseBox.textContent = '';
      notification.style.display = 'none';

      const validWordPattern = /^[A-Za-z]+$/;

      // Input validation
      if (!validWordPattern.test(word)) {
        responseBox.textContent = 'Error: Please enter a valid word (letters only, no numbers or special characters).';
        return;
      }

      if (definition.trim() === '') {
        responseBox.textContent = 'Error: Please provide a definition.';
        return;
      }

      // Use DictionaryService to store the word and definition
      // You can now instantiate without a parameter, as the default is set:
      const dictionaryService = new DictionaryService();
      dictionaryService.storeWord(word, definition)
        .then(text => {
          if (text.includes("already exists")) {
            responseBox.textContent = `The word "${word}" already exists in the dictionary.`;
          } else if (text.includes('successfully')) {
            notification.style.display = 'block';
            responseBox.textContent = text;
          } else {
            responseBox.textContent = text;
          }
        })
        .catch(error => {
          responseBox.textContent = `An error occurred: ${error.message}`;
        });
    });
  }

  // Handle searching for a word's definition
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const word = document.getElementById('word').value;

      responseBox.textContent = '';
      definitionResult.value = '';

      // Use DictionaryService to search for the word definition
      const dictionaryService = new DictionaryService();
      dictionaryService.getDefinition(word)
        .then(data => {
          if (data && data.definition) {
            definitionResult.value = data.definition;
            responseBox.textContent = `Found definition for "${word}".`;
          } else {
            responseBox.textContent = `No definition found for "${word}".`;
          }
        })
        .catch(error => {
          responseBox.textContent = `An error occurred: ${error.message}`;
        });
    });
  }
});
