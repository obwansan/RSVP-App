/* NOTES: 
> 'submit' in the form handler means it will run when the submit button is clicked, or the enter/return button is pressed.
> DOMContentLoaded loads all the HTML before running the JS file. It means the JS src tag can be anywhere in the HTML file (e.g. in the head), but it's best to always put it at the end of <body>'*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  
  const div = document.createElement('div');
  const filterLable = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  
  filterLable.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLable);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  
  // Hide/show those who haven't responded
  filterCheckBox.addEventListener('change', (e) => {
    // debugger;
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
  
  // create li function
  function createLi(text) {
      // create li, and span and add input text 
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = text;
      li.appendChild(span);
      
      // create and append label
      const label = document.createElement('label');
      label.textContent = 'Confirmed';
      li.appendChild(label);
      
      // create and append checkbox
      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      label.appendChild(checkBox);
      
      // create and append edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'edit';
      li.appendChild(editButton);
      
      // create and append remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'remove';
      li.appendChild(removeButton);
      
      return li;
  };
  
  // Form handler (add name to page)
  form.addEventListener('submit', (e) => {
      e.preventDefault(); // prevents page trying to submit to server (default behaviour)
      const text = input.value;
      input.value = ''; // clear input box
      const li = createLi(text);
      ul.appendChild(li);
  });
  
  // 'Confirmed' checkbox handler
  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });
  
  // remove-edit-save buttons handler
  ul.addEventListener('click', (e) => {
    
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      
      if (button.textContent === 'remove') {
        ul.removeChild(li);
      } 
      else if (button.textContent === 'edit') {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';
      } 
      else if (button.textContent === 'save') {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'edit';
      }
    }
  });
});



















