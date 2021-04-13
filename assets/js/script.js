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

//
$("#currentDay").text(today.format("dddd, MMM Do"));

// Load schedule from localStorage
function LoadScheduleFromLocalStorage() {
  //
  var savedWorkDaySchedule = JSON.parse(
    localStorage.getItem("WorkDaySchedule")
  );
  //   workDaySchedule = JSON.parse(localStorage.getItem("WorkDaySchedule"));
  //
  if (savedWorkDaySchedule != null) {
    workDaySchedule = savedWorkDaySchedule;
  }
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
    console.log("Remove it!");
    workDaySchedule.splice(index, 1);
    workDaySchedule.push(schedule);
  }
  //
  localStorage.setItem("WorkDaySchedule", JSON.stringify(workDaySchedule));
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
  var currentTime = Number(today.format("H"));
  var rowEl, colEl, textAreaEl, saveBtn;

  // 9 AM to 5 PM
  for (var i = 0; i < 9; i++) {
    //
    timeVal = Number(time.format("H"));
    timeText = time.format("hA"); // h[AM | PM]
    // Create a row
    rowEl = $("<div>");
    rowEl.attr("id", timeText);
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
    textAreaEl.addClass("form-control textarea");
    textAreaEl.text("");
    colEl.append(textAreaEl);

    rowEl.append(colEl);

    // Save button
    colEl = $("<div>");
    colEl.addClass("col-1 saveBtn");
    colEl.text("");

    saveBtn = $("<button>");
    saveBtn.addClass("far fa-save align-self-center");
    colEl.append(saveBtn);

    rowEl.append(colEl);

    containerDiv.append(rowEl);

    // Block this row if it is for a past time or noon
    if (timeVal < currentTime || timeVal == 12) {
      rowEl.addClass("past");
      $(".form-control").attr("disabled", true);
    } else if (timeVal == currentTime) {
      rowEl.addClass("present");
      //   $(".form-control").attr("disabled", false);
    } else {
      rowEl.addClass("future");
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

containerDiv.on("click", "button", SaveScheduleToLocalStorage);

InitializeSchedule();
