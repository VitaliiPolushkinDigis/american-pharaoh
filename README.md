# Coding Challenge
The challenge will consist of two tasks.
Please read the description carefully and if any question don't hesitate to reach out, we are always happy to help.
Here is a link for the design file that you have to reproduce : []()
We focus only on the mobile view.

## Installation

Install the dependencies and devDependencies and start the server.

```sh
yarn install
or 
npm install
```

create a .env.local file on the root directory and define this environment variable:

```sh
REACT_APP_BASE_API_URL=https://sv-api-dev-aoykudoaqq-ue.a.run.app
```

To start the development server run :
```sh
yarn dev
or
npm run dev
```

## Features
#### 1 - Tee time slider :  

should be generated from the mockdata, tee_time property
The mockData file under: ``` /src/api/mockData ``` should contain an array of objects representing the thumbnails or images that should be displayed in the slider. We call these objects, Stories. We'll reference that quite enough.

group the stories by tee times slot. eg:

- 1st story has a tee_time property of :  8:56
- 2nd story has a tee_time property of :  8:58
- 3rd story has a tee_time property of : 9:01
- 4th story has a tee_time property of : 9:04
- 5th story has a tee_time property of : 9: 08
- 6th story has a tee_time property of : 9:12
- 7th story has a tee_time property of : 9:16
- 8th story has a tee_time property of : 9: 20
- 9th story has a tee_time property of : 9:26
- 10th story has a tee_time property of 14:01
- 11th story has a tee_time property of 14:04

The output for the tee times slots (time of your shot as mentioned in the design file ) should be : [ 9:00, 9:10, 9:20, 9:30, 14:00 ]

The default tee time slot selected should be the latest. in the example above: 14:00. the user can select or scroll to see the other slots.

When tee time slot is selected, the thumbnails should update, and the centered thumbnail should be the thumbnail for the story that has the latest tee_time within that tee time slot. The thumbnails at its right, should not be part of that tee time slot.

from the example above, if i select 9:20. the centered thumbnail should be the thumbnail of the story that has a tee_time of : 9:26.

## 2 - SLIDER / CAROUSEL : 
Use any library or no library to build a carousel experience similar to what's designed.
Use the mockData again to populate the carousel properly with images. 
The user can scroll the carousel left or right depending if content is available.  
As the carousel scrolls if the time stamp / tee_time of a thumbnail changes to the next Tee Time slot we need to update the selected state of the tee time slider accordingly (e.g. 10:10 → 10:15…etc)