console.log("connected");
var firebaseConfig = {
    apiKey: "AIzaSyDbBK5H8SLVfWU2asDTD9VJ6oY0XTJ8xno",
    authDomain: "trainschedule-ff25d.firebaseapp.com",
    databaseURL: "https://trainschedule-ff25d.firebaseio.com",
    projectId: "trainschedule-ff25d",
    storageBucket: "",
    messagingSenderId: "834966189635",
    appId: "1:834966189635:web:cccb61ab156fe4f72b06f6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// create a database variable
var database = firebase.database();
$("#add-train-info").on("click", function(event){
    console.log("add train info")
    event.preventDefault();

    var trainName = $("#InputTrainName").val().trim();
    var destination = $("#InputDestination").val().trim();
    var firstTrainTime = $("#InputFirstTrain").val().trim();
    var frequency = $("#InputFrequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrainTime
    }
    // upload train info to DB
    database.ref().push(newTrain);
    console.log("new train info: " +JSON.stringify(newTrain));

    // $("#InputTrainName").val("")
    // $("#InputDestination").val("")
    // $("#InputFirstTrain").val("")
    // $("#InputFrequency").val("")
})


// var trainRow = $("<tr>");
// trainRow.append($("<td>Hogwarts Express</td>"), $("<td>Hogwarts</td>"),$("<td>15</td>"),$("<td>3:00</td>"),$("<td>6</td>"))

$("#train-info-table").append(trainRow)
var tFrequency = 3;

    

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  