# 05 Third-Party APIs: Work Day Scheduler

## Task

Create a simple calendar application that allows a user to save events for each hour of the day by modifying starter code. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

You'll need to use the [DayJS Docs](https://day.js.org/en/) library to work with date and time. Be sure to read the documentation carefully and concentrate on using DayJs in the browser.

## User Story

```md
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

```md
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

## Mock-Up

The following animation demonstrates the application functionality:

![A user clicks on slots on the color-coded calendar and edits the events.](./assets/images/05-third-party-apis-homework-demo.gif)

## Completed Work

URL of the deployed application:

https://japinell.github.io/KU-CBC-Homework-5-Work-Day-Scheduler/

URL of the GitHub repository:

https://github.com/japinell/KU-CBC-Homework-5-Work-Day-Scheduler

## How to Use the Application

The application starts by providing the user with a series of consecutive **_timeblocks_** for the day starting at 9 AM and ending at 5 PM.

Available timeblocks are presented in color **_red_** or **_green_**, where red is reserved for the timeblock corresponding to the _present_ hour, the hour when the application is run; and green is for _future_ hours. Unavailable timeblocks are presented in color **_gray_**, corresponding to _past_ hours.

In order for the user to save an event, they must click into a timeblock, enter text for the event, and click the **Save** button in that timeblock. The event containing the date, time, and description is saved to localstorage for future retrieval. Events can be entered in any order. At any time, timeblocks with events can be made available by deleting the text and clicking the Save button in that timeblock.

When the application is loaded or reloaded, the schedule for the day is retrieved from localstorage and the user is presented with timeblocks with event descriptions previously saved.

The application was built with a mobile-first mindset. It is **responsive** to small, medium, large, and extra-large screen sizes.

## Technologies Used to Complete the Task

The following technologies for web development were used to build the application:

### HTML (20%)

To build the general structure of the application

### CSS (12%)

**Bootstrap**, custom **CSS**, **Google Fonts**, and **Font Awesome** to style the application elements

### JavaScript (68%)

**jQuery** for dynamically rendering the timeblock elements, and reading and writing data from/to them. It also uses **DayJS** to parse, validate, manipulate, and display dates and times. Timeblocks are styled as they are created.

The application uses an array of objects to store the schedule, functions to render the timeblocks, and helper functions to read and write from/to localstorage to persist the schedule as a **JSON** object, handle the user interaction, and style the timeblocks.
