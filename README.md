4. Change the Confirmed checkbox to a list (select element) and include:
	- To confirm
	- Confirmed
	- Not coming


5. Don't display redundant info

When 'Hide those who haven't responded' is checked, hide the Confirmed text/checkbox of the invites who have responded.


6. Stop the invitees disappearing when page is refreshed

Use 'local storage' browser feature.

https://teamtreehouse.com/library/using-local-storage-with-javascript
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage


// ******************************** //

DONE

1. Validation

If an empty string is submitted:
	- prevent it
	- throw an error message

In the form handler
	- write a conditional statement to check for an empty string
	- if user submits an empty string, generate an alert message, or append error message to the DOM

Also, reject duplicate identical names.


2. Confirm/Confirmed

Make the text 'Confirm' if checkbox unchecked and 'Confirmed' if checkbox checked.

Need to find out how to target a text node to complete this task.

> https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM

> https://stackoverflow.com/questions/17195868/what-is-a-text-node-its-uses-document-createtextnode/17196184#17196184

> https://developer.mozilla.org/en-US/docs/Web/API/Text

NOTES:
  The mozilla links provided were no help. Found what I needed quickly on w3schools!
  
  Can't use textContent property: w3schools: "If you set the textContent property, any child nodes are removed and replaced by a single Text node containing the specified string".
  
  SOLUTION: "If you want to return the text of an element, remember that text is always inside a Text node, and you will have to return the Text node's node value (element.childNodes[0].nodeValue)."


3. Text area

Add text area to each li for notes (e.g. time they'll arrive, what they’re bringing etc).






