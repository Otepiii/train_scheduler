$(document).ready(function() {

	// 1. // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAkkbAUFohZ84LOVG6-YEdvPQYLiM5ZspU",
        authDomain: "train-scheduler-e510b.firebaseapp.com",
        databaseURL: "https://train-scheduler-e510b.firebaseio.com",
        projectId: "train-scheduler-e510b",
        storageBucket: "",
        messagingSenderId: "586386758280"
      };
      firebase.initializeApp(config);
    
      var database = firebase.database();
    

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  

	  // Store everything into a variable.
	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var trainFreq = childSnapshot.val().frequency;

	   // Declare variable
  		var trainFreq;

  		// Time is to be entered on the entry form
   		var firstTime = 0;

	    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

	    // Current Time
	    var currentTime = moment();
	    
	    // Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		// Time apart (remainder)
	    var tRemainder = diffTime % trainFreq;
	
	    // Minute Until Train
	    var tMinutesTillTrain = trainFreq - tRemainder;

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	   
	  // Add each train's data into the table
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });
    

    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

   // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: firstTrain,
        frequency: trainFreq
    };

    // Uploads train data to the database
        database.ref().push(newTrain);

     // Alert
        alert("Train successfully added");

   // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#firstTrain-input").val("");
    $("#freq-input").val("");
    });

});
