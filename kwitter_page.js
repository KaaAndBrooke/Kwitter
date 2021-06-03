 // Your web app's Firebase configuration
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
 user_name = localStorage.getItem("user_nameKey");
 room_name = localStorage.getItem("room_name");

 function getData() {
       firebase.database().ref("/" + room_name).on('value', function (snapshot) {
             document.getElementById("output").innerHTML = "";
             snapshot.forEach(function (childSnapshot) {
                   childKey = childSnapshot.key;
                   childData = childSnapshot.val();
                   if (childKey != "purpose") {
                         firebase_message_id = childKey;
                         message_data = childData;
                         name = message_data['name'];
                         message = message_data['message'];
                         like = message_data['likes'];
                         name_tag = "<h4>" + name + "</h4>";
                         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                         like_button = "<button class='btn btn-warning' id='" + firebase_message_id + "'value='" + like + "'onclick='updateLike(this.id)'>";
                         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Likes: " + like + "</span></button><hr>";
                         row = name_tag + message_with_tag + like_button + span_with_tag;
                         document.getElementById("output").innerHTML += row;
                   }
             });
       });
 }
 getData();

 function send() {
       message = document.getElementById("msg").value;
       firebase.database().ref(room_name).push({
             name: user_name,
             message: message,
             likes: 0
       });
       document.getElementById("msg").value = "";
 }

 function updateLike(message_id) {
       console.log("clicked on like button - " + message_id);
       button_id = message_id;
       likes = document.getElementById(button_id).value;
       updatedLikes = Number(likes) + 1;
       firebase.database().ref(room_name).child(message_id).update({
             likes: updatedLikes
       });
 }