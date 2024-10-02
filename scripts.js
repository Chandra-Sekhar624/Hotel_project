// JavaScript Document

      (function() {
        function validEmail(email) {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          return re.test(email);
        }

        function validateHuman(honeypot) {
          if (honeypot) {
            console.log("Robot Detected!");
            return true;
          } else {
            console.log("Welcome Human!");
          }
        }

        function getFormData(form) {
          var elements = form.elements;
          var fields = Object.keys(elements).filter(function(k) {
            return (elements[k].name !== "honeypot");
          }).map(function(k) {
            if(elements[k].name !== undefined) {
              return elements[k].name;
            } else if(elements[k].length > 0) {
              return elements[k].item(0).name;
            }
          }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
          });

          var formData = {};
          fields.forEach(function(name){
            var element = elements[name];
            formData[name] = element.value;
            if (element.length) {
              var data = [];
              for (var i = 0; i < element.length; i++) {
                var item = element.item(i);
                if (item.checked || item.selected) {
                  data.push(item.value);
                }
              }
              formData[name] = data.join(', ');
            }
          });

          formData.formDataNameOrder = JSON.stringify(fields);
          formData.formGoogleSheetName = form.dataset.sheet || "sheet1";
          formData.formGoogleSendEmail = form.dataset.email || "";

          console.log(formData);
          return formData;
        }

        function handleFormSubmit(event) {
          event.preventDefault();
          var form = event.target;
          var data = getFormData(form);
          if(data.email && !validEmail(data.email)) {
            var invalidEmail = form.querySelector(".email-invalid");
            if (invalidEmail) {
              invalidEmail.style.display = "block";
              return false;
            }
          } else {
            disableAllButtons(form);
            var url = form.action;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
              console.log(xhr.status, xhr.statusText);
              console.log(xhr.responseText);
              var formElements = form.querySelector(".form-elements");
              if (formElements) {
                formElements.style.display = "none";
              }
              var thankYouMessage = form.querySelector(".thankyou_message");
              if (thankYouMessage) {
                thankYouMessage.style.display = "block";
              }
              return;
            };
            var encoded = Object.keys(data).map(function(k) {
              return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);
          }
        }

        function loaded() {
          console.log("Contact form submission handler loaded successfully.");
          var forms = document.querySelectorAll("form.gform");
          for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
          }
        }
        document.addEventListener("DOMContentLoaded", loaded, false);

        function disableAllButtons(form) {
          var buttons = form.querySelectorAll("button");
          for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
          }
        }
      })();
   





 document.getElementById('uploadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);

            fetch('/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });







const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('File type not allowed.'));
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    const phone = req.body.phone; // Retrieve phone number

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded or file type not allowed.' });
    }
    
    res.json({ message: `File uploaded successfully! Phone: ${phone}`, filePath: req.file.path });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







// Function to toggle chatbot visibility
function toggleChat() {
  const chatbot = document.getElementById('chatbot');
  if (chatbot.style.display === 'block') {
    chatbot.style.display = 'none';
  } else {
    chatbot.style.display = 'block';
    chatbot.style.animation = 'slideUp 0.5s ease-out forwards';
  }
}

// Function to send a message
function sendMessage(event) {
  const input = document.getElementById('chat-input');
  const chatBody = document.getElementById('chatbot-body');

  // Check if "Enter" key was pressed
  if (event && event.key !== 'Enter') {
    return;
  }

  const userMessage = input.value.trim();
  if (userMessage) {
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    userMessageDiv.textContent = userMessage;
    chatBody.appendChild(userMessageDiv);
    
    chatBody.scrollTop = chatBody.scrollHeight;
    input.value = '';

    // Simulate bot response
    setTimeout(() => {
      const botMessageDiv = document.createElement('div');
      botMessageDiv.className = 'bot-message';
      botMessageDiv.textContent = 'Thank you for Connect Candu Laxury. We Connect very Soon!';
      chatBody.appendChild(botMessageDiv);
      
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
  }
}
