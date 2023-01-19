const form = document.querySelector('.sign-in-form');
      const closeBtn = document.querySelector('.close-btn');
      const popup = document.querySelector('.popup');
      const icon = document.querySelector('.icon');

      icon.addEventListener('click', (e) => {
        let pass = document.querySelector('input[name="password"]');
        if(pass.type === "password"){
          pass.type = "text";
        } else {
          pass.type = "password";
        }
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let username = form.username.value;
        let password = form.password.value;
        if (username === 'admin' && password === 'password') {
          window.location.replace('admin-panel.html');
        } else {
          popup.classList.add('active');
          setTimeout(() => {
            popup.classList.remove('active');
          }, 3000);
        }
      });
      closeBtn.addEventListener('click', (e) => {
        popup.classList.remove('active');
      });

document.onkeydown = function(e) {
  if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}