// Elements
const containerDiv = $(".container");

// Objects
var schedule = {
  date: "",
  time: "",
  description: "",
};

var workDaySchedule = [];

// Variables
var today = dayjs();

//
$("#currentDay").text(today.format("dddd, MMM Do"));

// Load schedule from localStorage
function LoadScheduleFromLocalStorage() {
  //
  workDaySchedule = JSON.parse(localStorage.getItem("WorkDaySchedule"));
}

// Save schedule to localStorage
function SaveScheduleToLocalStorage() {
  //
  schedule = {
    date: "2021-04-12",
    time: "9",
    description: "Event 1",
  };
  workDaySchedule.push(schedule);
  //
  schedule = {
    date: "2021-04-12",
    time: "10",
    description: "Event 2",
  };
  workDaySchedule.push(schedule);
  //
  schedule = {
    date: "2021-04-12",
    time: "11",
    description: "Event 3",
  };
  workDaySchedule.push(schedule);
  //
  localStorage.setItem("WorkDaySchedule", JSON.stringify(workDaySchedule));
}

// Set reserved time blocks
function SetReservedTimeBlocks() {
  //
  if (workDaySchedule != null) {
    //
    workDaySchedule.forEach(function (item) {
      // Set the time block
      var row = "#" + item.time;
      $(row).text(item.description);
    });
  }
}

// Build time blocks
function BuildTimeBlocks() {
  //
  var time = today.hour(9);
  var timeVal, timeText;
  var currentTime = Number(today.format("H"));
  var rowEl, colEl, textAreaEl;

  // 9 AM to 5 PM
  for (var i = 0; i < 9; i++) {
    //
    timeVal = Number(time.format("H"));
    timeText = time.format("hA"); // h[AM | PM]
    // Create a row
    rowEl = $("<div>");
    rowEl.addClass("row time-block");

    // Hour
    colEl = $("<div>");
    // colEl.addClass("col-1 align-self-center");
    colEl.addClass("col-1 hour");
    colEl.text(timeText);
    rowEl.append(colEl);

    // Text area
    colEl = $("<div>");
    colEl.addClass("col-10 form-floatting");

    textAreaEl = $("<textarea>");
    textAreaEl.attr("id", timeVal);
    textAreaEl.addClass("form-control textarea");
    textAreaEl.text("");
    colEl.append(textAreaEl);

    // Check for noon
    // if (timeVal === "12") {
    //   colEl.addClass("bg-danger");
    // }

    rowEl.append(colEl);

    // Save button
    colEl = $("<div>");
    // colEl.addClass("col-1 align-self-center");
    colEl.addClass("col-1 saveBtn far fa-save");
    colEl.text("");
    rowEl.append(colEl);

    containerDiv.append(rowEl);

    // Block this row if it is for a past time or noon
    if (timeVal < currentTime || timeVal == 12) {
      rowEl.addClass("past");
      $(".form-control").attr("disabled", true);
    } else if (timeVal == currentTime) {
      rowEl.addClass("present");
    } else {
      rowEl.addClass("future");
    }

    // Increment time block by 1 hour
    time = time.add(1, "h");
  }
}

// Initialization
function InitializeComponents() {
  //
  SaveScheduleToLocalStorage();
  LoadScheduleFromLocalStorage();
  BuildTimeBlocks();
  SetReservedTimeBlocks();
}

InitializeComponents();
