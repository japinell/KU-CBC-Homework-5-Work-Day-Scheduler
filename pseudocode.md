# 05 Thirdy Party APIs: Work Day Scheduler

## Pseudocode

1. Populate currentDay with today's date by calling the DayJS API.

2. On the container element:

- Read schedule from localStorage; load schedule into the timeblocks.

- Build rows corresponding to the time blocks from 9 AM to 5 PM using the DayJS API.

- If the time block loaded from localStorage is before the current time, block that time as unavailable.

- Block the 12 PM time block for lunch.

- Style each time block row appropriately.

- Allow the time blocks to be edited; provide a save button per time block.

3. When the save button is clicked, save the time block to localStorage.
