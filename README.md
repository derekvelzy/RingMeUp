# Ring Me Up #
[Link to Demo Video on Youtube](https://www.youtube.com/watch?v=PkraVlwzjjM)

## Overview ##
This is a mobile app meant for tracking health and fitness goals on a daily, weekly, and monthly basis. The user's "rings" get filled up as they complete their goals each day/week/month.

## Screenshots ##
<img src="https://derekvelzy-website-images.s3-us-west-1.amazonaws.com/Home.png" height="400">
<img src="https://derekvelzy-website-images.s3-us-west-1.amazonaws.com/AddPopup.png" height="400">
<img src="https://derekvelzy-website-images.s3-us-west-1.amazonaws.com/Calendar.png" height="400">

## Features ##
#### Authentication ####
- Users can signup and login with with an email and password.
- Users logout in the options popup modal.

#### Dashboard ####
- Users can view their progress towards their monthly and weekly goals in the pie chart rings.
- Users can add new goals based on a single day, daily, weekly, or monthly basis.
- Users can increment or decrement progress on individual goals.
- Users can edit their goals or delete them altogether.

#### Calendar ####
- Users can schedule single day goals at any day in the month.
- Pressing on a date with bring up a modal showing the existing single-day goals at that day, and an form to add more goals for that day.

## UI Highlights ##
- Custom parallax scrolling animations with React Native's Animated API.
- Responsive slide transitions to each page and for each popup modal.
- Rounded SVG borders auto-scale based on scroll height.

## Tech/framework Used ##
__Built with__
- JavaScript
- React Native
- Firebase
- react-native-pie

## Run the Project Locally ##
From the repo
1. Clone the project locally
2. Run ```npm install``` in the command line
3. Run ```cd ios/ && pod install``` in the command line
3. Run ```npx react-native run-ios``` in the command line

[Derek Velzy's Porfolio](https://www.dvelzyportfolio.com/)
