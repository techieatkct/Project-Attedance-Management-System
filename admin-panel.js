var firebaseConfig = {
    apiKey: "AIzaSyCa6VW5fzvdJDkYCK8C8baJts0xByLmA7E",
    authDomain: "ams-ragul.firebaseapp.com",
    databaseURL: "https://ams-ragul-default-rtdb.firebaseio.com",
    projectId: "ams-ragul",
    storageBucket: "ams-ragul.appspot.com",
    messagingSenderId: "498728490715",
    appId: "1:498728490715:web:d8a1de94a351f60d6edefe"
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
  const name = nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1);
  const rollno = rollnoInput.value.toUpperCase();
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
let count = 1;

db.collection("students")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const name = doc.data().name.charAt(0).toUpperCase() + doc.data().name.slice(1);
      const rollno = doc.data().rollno.toUpperCase();
      students.push({name, rollno});
    });

    let doc = new jsPDF();
    doc.text(20, 20, "\t\t\t\t\tABSENTEES \n\n" + students.map(student => `${count++}) ${student.name} - ${student.rollno}`).join("\n\n"));
    doc.save("attendance.pdf");
  })
  .catch((error) => {
    alert(error.message);
  });
}


function verify() {
  const rollno = rollnoStuInput.value.toUpperCase();

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