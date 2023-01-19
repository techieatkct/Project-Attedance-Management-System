var firebaseConfig = {
    apiKey: "AIzaSyCzUoB9cMlUqoIcAHod00s1jiY1P_IE0BU",
    authDomain: "lolweb.firebaseapp.com",
    databaseURL: "https://lolweb-default-rtdb.firebaseio.com",
    projectId: "lolweb",
    storageBucket: "lolweb.appspot.com",
    messagingSenderId: "740706163363",
    appId: "1:740706163363:web:32ff191ca3973fb2577d16"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const adminPanel = document.querySelector("#admin-panel");
const studentPanel = document.querySelector("#student-panel");
const nameInput = document.querySelector("#name");
const rollnoInput = document.querySelector("#rollno");
const rollnoStuInput = document.querySelector("#rollno-stu");
function add() {
  const name = nameInput.value;
  const rollno = rollnoInput.value;
  if (name && rollno) {
    db.collection("students")
      .doc(rollno)
      .set({
        name,
        rollno,
      })
      .then(() => {
        alert("Student added successfully!");
        nameInput.value = "";
        rollnoInput.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Please enter name and roll no.");
  }
}
function edit() {
  const name = nameInput.value;
  const rollno = rollnoInput.value;

  if (name && rollno) {
    db.collection("students")
      .doc(rollno)
      .update({
        name,
      })
      .then(() => {
        alert("Student updated successfully!");
        nameInput.value = "";
        rollnoInput.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Please enter name and roll no.");
  }
}
function remove() {
  const rollno = rollnoInput.value;

  if (rollno) {
    db.collection("students")
      .doc(rollno)
      .delete()
      .then(() => {
        alert("Student removed successfully!");
        rollnoInput.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Please enter roll no.");
  }
}
function removeverify(rollno) {
  if (rollno) {
    db.collection("students")
      .doc(rollno)
      .delete()
      .then(() => {
        //alert("Student removed successfully!");
        rollnoInput.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Number not available");
  }
}
function generatePdf() {
let students = [];

db.collection("students")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const name = doc.data().name;
      students.push(name);
    });

    let doc = new jsPDF();
    doc.text(20, 20, students.join(", "));
    doc.save("attendance.pdf");
  })
  .catch((error) => {
    alert(error.message);
  });
}

function verify() {
  const rollno = rollnoStuInput.value;

  if (rollno) {
    db.collection("students")
      .doc(rollno)
      .get()
      .then((doc) => {
        if (doc.exists) {
          alert(`Name: ${doc.data().name}`);
          rollnoStuInput.value = "";
          removeverify(rollno);
        } else {
          alert("Student not found!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Please enter roll no.");
  }
}


auth.onAuthStateChanged((user) => {
  if (user) {
    adminPanel.classList.remove("hidden");
  } else {
    studentPanel.classList.remove("hidden");
  }
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