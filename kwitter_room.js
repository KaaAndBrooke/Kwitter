var firebaseConfig = {
      apiKey: "AIzaSyDva7jifWoz7A5Dl4-ugXwd38gAwYis86s",
      authDomain: "project-7648773547393865430.firebaseapp.com",
      databaseURL: "https://project-7648773547393865430-default-rtdb.firebaseio.com",
      projectId: "project-7648773547393865430",
      storageBucket: "project-7648773547393865430.appspot.com",
      messagingSenderId: "449105324302",
      appId: "1:449105324302:web:21256dcdcc422d774f8f5f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_nameKey")

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;

                  console.log("Room Name - " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function LogOut() {
      localStorage.removeItem("user_nameKey");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}