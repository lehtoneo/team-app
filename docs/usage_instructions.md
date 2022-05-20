# Usage instructions

The app is for teams, mainly sports teams, to manage their events.

To use the app, one needs an account.

The app landing page has a Sign In button, if user is not logged in. By pressing the button, a sign in modal opens. User can create an account by pressing "Create account" from the modal.

## After signing in

The rest of the instructions expect that user has logged in.

### Create a team

Go to teams page:

![Teams navigation](./images/teams_navigation.PNG)

Press create a new team. 

Submit the new team. 

Note! There is some bug in the heroku environment, where a complain about unique key is made. Submit again if this happens.

### Create events for the team

Go to page of the team and go to events tab.

Press Create events

![Create event](./images/create_event.PNG)

After creating the event, you are redirected to the events page.

### Mark event attendance

Mark your event attendance from the events' page

![Mark attendance](./images/mark_attendace.PNG)

### Joining a team

One needs a join link to join an existing team. The join link can be found from the teams' main page. (Only visible to admins and owner).

One can test joining a team via this link:

https://lehtoneo-team-app.herokuapp.com/#/teams/join/221d0c49-ae4d-4158-8bb4-15229f8c9afd

### Team settings

## Discord webhook

A discord webhook can be saved for the team. When given a valid discord webhook and turning discord notifications on, information about events are sent to the webhook.

## Roles

One can edit member roles in the team settings page. 

### Other features

There are some other features in the application, such as event editing and deleting, but I will not go through them in detail, as they are quite self explanatory. 

Upcoming events can be viewed from /my-events page.

