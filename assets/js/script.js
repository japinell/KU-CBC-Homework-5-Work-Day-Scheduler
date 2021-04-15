// Elements
const containerDiv = $(".container");

// Objects
var schedule = {
  date: "",
  time: "",
  task: "",
};

var workDaySchedule = [];

// Variables
var today = dayjs();
var currentTime = Number(today.format("H"));
var currentTimeText = Number(today.format("hA"));
//
$("#currentDay").text(today.format("dddd, MMM Do"));

// Load schedule from localStorage
function LoadScheduleFromLocalStorage() {
  //
  var savedWorkDaySchedule = JSON.parse(
    localStorage.getItem("WorkDaySchedule")
  );
  //
  if (savedWorkDaySchedule != null) {
    workDaySchedule = savedWorkDaySchedule;
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
  var index = -1;
  for (var i = 0, l = workDaySchedule.length; i < l; i++) {
    if (workDaySchedule[i].time === newTime) {
      index = i;
      break;
    }
  }
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
}

// Check if the new item is already in the workDaySchedule array
function FindObjectInWorkDaySchedule(newTime) {
  //
  var index = -1;

  for (var i = 0, l = workDaySchedule.length; i < l; i++) {
    if (workDaySchedule[i].time === newTime) {
      index = i;
      break;
    }
  }
  //
  return index;
  //
}

// Set reserved time blocks
function SetReservedTimeBlocks() {
  //
  LoadScheduleFromLocalStorage();
  //
  if (workDaySchedule != null) {
    //
    workDaySchedule.forEach(function (item) {
      //
      var row = "#" + item.time; // Row id = #[hour]
      $(row).children(".form-floatting").children(".textarea").val(item.task);
      //
    });
    //
  }
}

// Build time blocks
function BuildTimeBlocks() {
  //
  var time = today.hour(15);
  var timeVal, timeText;
  var rowEl, colEl, textAreaEl, saveBtnEl, iEl;

  containerDiv.addClass("container-fluid");

  // 9 AM to 5 PM
  for (var i = 0; i < 9; i++) {
    //
    timeVal = Number(time.format("H"));
    timeText = time.format("hA"); // h[AM | PM]
    // Row
    rowEl = $("<div>");
    rowEl.attr("id", timeText);
    rowEl.addClass("row time-block");

    // Columns
    // Hour
    colEl = $("<div>");
    colEl.addClass("row col-sm-1 hour text-right");
    colEl.text(timeText);
    colEl.appendTo(rowEl);

    // Text area
    colEl = $("<div>");
    colEl.addClass("row col-sm-10 px-0 form-floatting");

    textAreaEl = $("<textarea>");
    textAreaEl.addClass("form-control textarea text-dark");
    textAreaEl.text("");
    textAreaEl.appendTo(colEl);

    colEl.appendTo(rowEl);

    // Save button
    colEl = $("<div>");
    colEl.addClass("row col-sm-1 px-0 text-left align-self-center");

    saveBtnEl = $("<button>");
    saveBtnEl.addClass("btn btn-lg btn-block saveBtn");

    iEl = $("<i>");
    iEl.addClass("fa fa-save");
    iEl.appendTo(saveBtnEl);

    saveBtnEl.appendTo(colEl);

    colEl.appendTo(rowEl);

    rowEl.appendTo(containerDiv);

    // Block this row if it is for a past time or noon
    if (timeVal < currentTime || timeVal == 12) {
      textAreaEl.addClass("past");
      textAreaEl.attr("disabled", true);
      // $(".form-control").addClass("past");
      // $(".form-control").attr("disabled", true);
    } else if (timeVal == currentTime) {
      textAreaEl.addClass("present");
      // $(".timeblock")
      // .children("#" + currentTimeText)
      // .addClass("present");
      // $(".form-control").addClass("present");
    } else {
      textAreaEl.addClass("future");
      // rowEl.addClass("future");
      // $(".form-control").addClass("future");
    }

    // Increment time block by 1 hour
    time = time.add(1, "h");
  }
}

// Initialization
function InitializeSchedule() {
  //
  BuildTimeBlocks();
  SetReservedTimeBlocks();
  //
}

// Listen for clicks on the Save button, an i element
containerDiv.on("click", "i", SaveScheduleToLocalStorage);

InitializeSchedule();
