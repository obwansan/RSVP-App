/* 
> 'submit' in the form handler means it will run when the submit button is clicked, or the 
enter/return button is pressed.
> DOMContentLoaded loads all the HTML before running the JS file. It means the JS src tag can 
be anywhere in the HTML file (e.g. in the head), but it's best to always put it at the end of 
<body>'*/

document.addEventListener('DOMContentLoaded', () => {
  
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  
  const div = document.createElement('div');
  const filterLable = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  
  let emptySubmits = 0;
  let duplicateSubmits = 0;
  let invitees = [];
  let name = '';
  
  filterLable.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLable);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  
  // Hide/show those who haven't responded
  filterCheckBox.addEventListener('change', (e) => {
    
    const isChecked = e.target.checked; // if checkbox checked the value will be true and vica versa
    const lis = ul.children;
  
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];
      if (li.className !== 'responded') {
        if (isChecked) {
          li.style.display = 'none';
      } else {
          li.style.display = '';
        }
      }
    }
  });
  
  function createLi(text) {
    
      function createElement(elementName, property, value) {
          const element = document.createElement(elementName);
          element[property] = value;
          return element;
      };
      function appendToLi(elementName, property, value) {
          const element = createElement(elementName, property, value);
          li.appendChild(element);
          return element;
      };
      const li = document.createElement('li');
      appendToLi('span', 'textContent', text);
      appendToLi('label', 'textContent', 'Confirm')
        .appendChild(createElement('input', 'type', 'checkbox'));
      appendToLi('button', 'textContent', 'edit');
      appendToLi('button', 'textContent', 'remove');
      appendToLi('textarea', 'textContent', 'Enter notes here...');
      return li;
  };
  
  // Form handler (add invitee [name, checkbox, buttons] to page)
  form.addEventListener('submit', (e) => {
    
      e.preventDefault(); // prevents page trying to submit to server (default behaviour)
      
      name = input.value.toLowerCase();
      const header = document.querySelector('header');
      
      const errorMessageActions = {
          
          printErrorMessage: (message) => {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = message;
            errorMessage.className = "error-message";
            header.appendChild(errorMessage);
          },
          removeErrorMessage: () => {
            const message = header.lastElementChild;
            header.removeChild(message);
          }
      };    
      // if existing empty submit error message, remove it
      if (emptySubmits > 0) {
            errorMessageActions.removeErrorMessage();
            emptySubmits = 0;
      }
      // else if existing duplicate name error message, remove it
      else if (duplicateSubmits > 0) {
            errorMessageActions.removeErrorMessage();
            duplicateSubmits = 0;
      }
          
      // if empty string submitted, throw error message   
      if (input.value === '') { 
          errorMessageActions.printErrorMessage("Please submit a name"); 
          emptySubmits++;
      }
      // else if name submitted 
      else {
        // if a name has already been submitted
        if (invitees.length > 0) { 
          // check if name is duplicate and, if so, increment counter
          for (let i = 0; i < invitees.length; i++) {
            if (name === invitees[i]) {
              duplicateSubmits++;
            }
          }
          // if duplicate name, throw error message
          if (duplicateSubmits > 0) {
            errorMessageActions.printErrorMessage("Cannot submit duplicate name"); 
          }
          // else, create invitee
          else {
            input.value = '';
            const li = createLi(name);
            ul.appendChild(li);
            invitees.push(name);
          } 
      } else { // else if name submitted but no name already submitted
          // create invitee
          input.value = '';
          const li = createLi(name);
          ul.appendChild(li);
          invitees.push(name); 
        }
      }
  });
  
  // 'Confirmed' checkbox handler
  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const label = checkbox.parentNode;
    const listItem = checkbox.parentNode.parentNode;
    
    if (checked) {
      listItem.className = 'responded';
      label.childNodes[0].nodeValue = 'Confirmed';
    } else {
      listItem.className = '';
      label.childNodes[0].nodeValue = 'Confirm';
    }
  });
  /* childNodes[0] is the first text node of label element. Best way to access a text node. The textContent and innerHTML properties remove any child nodes (in this case, the checkbox!)*/
    
  // Buttons & input field handler
  ul.addEventListener('click', (e) => {
    
    if (e.target.tagName === 'BUTTON') {
      
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
        
      function deleteNameInArray(name) {
          for (let i = 0; i < invitees.length; i++) {
            if (name === invitees[i]) {
              invitees.splice(i, 1);
            }
          }
      };
      
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
          deleteNameInArray(li.firstElementChild.textContent);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);;
          deleteNameInArray(span.textContent);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };
      // The string in the action variable is used to 
      // directly access the function in nameActions.
      nameActions[action](); 
    }
  });
});





















