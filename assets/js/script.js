// Elements
const containerDiv = $(".container");

// Variables
var today = dayjs();
var actualSchedule;

//
$("#currentDay").text(today.format("dddd, MMM Do"));

// Load schedule from localStorage
function LoadScheduleFromLocalStorage() {
  //
  actualSchedule = JSON.parse(localStorage.getItem("WorkDaySchedule"));
}

// Save schedule to localStorage
function SaveScheduleToLocalStorage() {
  //
  localStorage.setItem("WorkDaySchedule", JSON.stringify(actualSchedule));
}

// Build timeblocks
function BuildTimeBlocks() {
  //
  var rowEl, colEl, textAreaEl;
  var time = today.hour(9);

  // 9 AM to 5 PM
  for (var i = 0; i < 9; i++) {
    // Create a row
    rowEl = $("<div>");
    rowEl.addClass("row time-block");

    // Check for noon
    // if (time.format("h") === "12") {
    //   rowEl.addClass("bg-danger");
    // }

    // Hour
    colEl = $("<div>");
    // colEl.addClass("col-1 align-self-center");
    colEl.addClass("col-1 hour");
    colEl.text(time.format("hA"));
    rowEl.append(colEl);

    // Text area
    colEl = $("<div>");
    colEl.addClass("col-10 form-floatting");

    textAreaEl = $("<textarea>");
    textAreaEl.addClass("form-control textarea");
    textAreaEl.text("Test");
    colEl.append(textAreaEl);

    rowEl.append(colEl);

    // Save button
    colEl = $("<div>");
    // colEl.addClass("col-1 align-self-center");
    colEl.addClass("col-1 saveBtn far fa-save");
    colEl.text("");
    rowEl.append(colEl);

    containerDiv.append(rowEl);

    // Increment time block by 1 hour
    time = time.add(1, "h");
  }
}

BuildTimeBlocks();
