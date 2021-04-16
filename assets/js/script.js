// Timeblock elements
const containerDiv = $(".container");
const TIME_BLOCKS_START = 9;
const TIME_BLOCKS_NUMBER = 9;

// Objects
var schedule = {
  date: "",
  time: "",
  task: "",
};

var workDaySchedule = [];

// Variables
var today = dayjs();
var todayText = today.format("YYYY-MM-DD");
var currentTime = Number(today.format("H"));
var currentTimeText = Number(today.format("hA"));
//
$("#currentDay").text(today.format("dddd, MMM Do"));

// Display success status message
function ShowSuccess(message) {
  //
  var pEl = $("p.description");
  pEl.addClass("text-success").text(message);
  //
  setTimeout(function () {
    //
    pEl.text("");
    //
  }, 1000);
  //
}

// Display error status message
function ShowError(message) {
  //
  var pEl = $("p.description");
  pEl.addClass("text-danger").text(message);
  //
  setTimeout(function () {
    //
    pEl.text("");
    //
  }, 1000);
  //
}

// Load schedule from localStorage
function LoadScheduleFromLocalStorage() {
  //
  var savedWorkDaySchedule = JSON.parse(
    localStorage.getItem("WorkDaySchedule")
  );
  //
  if (savedWorkDaySchedule != null) {
    //
    workDaySchedule = savedWorkDaySchedule;
    //
  }
  //
}

// Save schedule to localStorage
function SaveScheduleToLocalStorage() {
  //
  var newDate = today.format("YYYY-MM-DD");
  var newTime = $(this).parents(".time-block").children(".hour").text().trim();
  var newTask = $(this)
    .parents(".time-block")
    .children(".form-floatting")
    .children(".textarea")
    .val()
    .trim();
  //
  schedule = {
    date: newDate,
    time: newTime,
    task: newTask,
  };
  //
  // Looks for the timeblock id in the schedule
  //
  var index = IsTimeBlockBooked(newTime);
  //
  if (index < 0) {
    // Insert it
    workDaySchedule.push(schedule);
  } else {
    // Remove it and insert it
    workDaySchedule.splice(index, 1);
    workDaySchedule.push(schedule);
  }
  //
  localStorage.setItem("WorkDaySchedule", JSON.stringify(workDaySchedule));
  //
  ShowSuccess("Schedule successfully saved to local storage...");
  //
}

// Check if the item is already in the workDaySchedule array
function IsTimeBlockBooked(newTime) {
  //
  // If found, returns the array index; otherwise, -1
  //
  var index = -1;
  //
  for (var i = 0, l = workDaySchedule.length; i < l; i++) {
    //
    if (workDaySchedule[i].time === newTime) {
      index = i;
      break;
    }
    //
  }
  //
  return index;
  //
}

// Style time blocks with past, present, and future classes
function StyleTimeBlocks() {
  //
  var timeBlockId, timeBlockVal, textAreaEl, saveBtn;
  //
  // Select the timeblock container and children with class = "time-block"
  //
  $(".container")
    .children(".time-block")
    .each(function () {
      //
      timeBlockId = $(this).attr("time-block-id");
      timeBlockVal = $(this).attr("time-block-value");
      textAreaEl = $(this).children(".form-floatting").children(".textarea");
      saveBtn = $(this).children(".row").children(".btn");
      //
      //if (timeBlockVal < currentTime || timeBlockVal == 12) {
      if (timeBlockVal < currentTime) {
        //
        textAreaEl.addClass("past");
        textAreaEl.attr("disabled", true);
        saveBtn.attr("disabled", true);
        //
      } else if (timeBlockVal == currentTime) {
        //
        textAreaEl.addClass("present");
        //
      } else {
        //
        textAreaEl.addClass("future");
        //
      }
    });
  //
}

// Renders the text for the reserved time blocks
function RenderBookedTimeBlocks() {
  //
  LoadScheduleFromLocalStorage();
  //
  if (workDaySchedule != null) {
    //
    var index;
    //
    // Select the timeblock container and children with class = "time-block"
    //
    $(".container")
      .children(".time-block")
      .each(function () {
        //
        timeBlockId = $(this).attr("time-block-id");
        timeBlockVal = $(this).attr("time-block-value");
        //
        // Looks for the timeblock id in the schedule
        //
        index = IsTimeBlockBooked(timeBlockId);
        //
        if (index >= 0) {
          //
          $(this)
            .children(".form-floatting")
            .children(".textarea")
            .val(workDaySchedule[index].task);
          //
        }
        //
      });
    //
  }
  //
}

// Render the time blocks (this could have been done in the HTML, but I took the challenge farther)
function RenderTimeBlocks() {
  //
  var time = today.hour(TIME_BLOCKS_START);
  var timeVal, timeText;
  var rowEl, colEl, textAreaEl, saveBtnEl, iEl, pEl;

  // Message element
  pEl = $("<p>");
  pEl.addClass("h6 text-center text-muted font-italic description");
  pEl.text("Hello");
  pEl.appendTo(containerDiv);

  // containerDiv.addClass("container-sm");

  // 9 AM to 5 PM
  for (var i = 0; i < TIME_BLOCKS_NUMBER; i++) {
    //
    timeVal = Number(time.format("H"));
    timeText = time.format("hA"); // h[AM | PM]
    // Row
    rowEl = $("<div>");
    // rowEl.attr("id", timeText);
    rowEl.attr("time-block-id", timeText);
    rowEl.attr("time-block-value", timeVal);
    rowEl.addClass("row time-block");

    // Columns
    // Hour
    colEl = $("<div>");
    colEl.addClass("col-1 mx-0 px-0 text-center row hour");
    colEl.text(timeText);
    colEl.appendTo(rowEl);

    // Text area
    colEl = $("<div>");
    colEl.addClass("col-10 mx-0 px-0 form-floatting row");

    textAreaEl = $("<textarea>");
    textAreaEl.addClass("form-control text-dark textarea");
    textAreaEl.text("");
    textAreaEl.appendTo(colEl);

    colEl.appendTo(rowEl);

    // Save button
    colEl = $("<div>");
    colEl.addClass("col-1 mx-0 px-0 text-left align-self-center row");

    saveBtnEl = $("<button>");
    saveBtnEl.addClass("btn btn-lg btn-block saveBtn");

    iEl = $("<i>");
    iEl.addClass("fa fa-save");
    iEl.appendTo(saveBtnEl);

    saveBtnEl.appendTo(colEl);

    colEl.appendTo(rowEl);

    rowEl.appendTo(containerDiv);

    // Increment time block by 1 hour
    time = time.add(1, "h");
    //
  }
  //
}

// Initialization
function InitializeSchedule() {
  //
  RenderTimeBlocks();
  RenderBookedTimeBlocks();
  StyleTimeBlocks();
  ShowSuccess("Application successfully initialized...");
  //
}

// Listen for clicks on the Save button, an i element
containerDiv.on("click", "button", SaveScheduleToLocalStorage);

// Rock & Roll!
InitializeSchedule();
