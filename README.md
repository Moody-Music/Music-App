# Music-App | Moody Music
`Queen-fox Group Project Week 1. Simple web application of playing music by your Mood. This app has :`
> - Register
> - Login
> - Login with Google
> - Play 5 Songs with Liric based on Your Mood

`environment variables: (.env)`

> - PORT=
> - SECRET=
> - CLIENT_ID=

`link deploy:`
> - _optional_

`Moody-Music Guides:`
> - Log In - this button automatically guide you to our main page
> - Register - this button automatically store your user data to the application
> - Google Button - this button allows you to signing in using your google account
> - Log Out - this button allows you to log yourself out from the application.
> - Select Genre (dropdown) - shows you the number of genres given
> - Play icon - Play the selected music
> - View Lyrics - this button will provide you lyric of the selected music. It comes with a confirmation Modal.

&nbsp;
# RESTful endpoints

## Global Responses
_Response (500 - Unknown error)_
> This endpoint should always return response below,
```
{ "message": "Interval Server Error" }
```
---
## POST /register

> Create a new user account

_Request Header_
```
  no need
```
_Request Body_
```
{
  email: <email input>,
  password: <email password>
}
```
_Response (201)_
```
{
    "id": <created id>,
    "email": <created email>,
    "password": <hashed password>,
    "updatedAt": "2020-05-05T08:39:37.867Z",
    "createdAt": "2020-05-05T08:39:37.867Z"
}
```
_Response (400 - Bad Request)_
```
{ 
    "message": "Email already exist"
}
```
---
## POST /login

> Create a new user account

_Request Header_
```
  no need
```
_Request Body_
```
{
  email: <email input>,
  password: <email password>
}
```
_Response (200)_
```
{
    "email": <listed email>
    "token": <created token>
}
```
_Response (400 - Bad request)_
```
{ 
    "message": "Invalid, check email or password"
}
```
---
## POST /google-signin

> Google sign in 

_Request Header_
```
  no need
```
_Request Body_
```
{
  id_token: <given id_token>
}
```
_Response (200)_
```
{
    "email": <listed email>
    "access_token": <created token>
}
```
---
## GET /songs/:mood

> Show five random songs for one to be selected

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
  no need
```
_Response (200)_
```
{  
    songs:[
        { 
            "id": <created id>,
            "artist": <created artist>,
            "title": <created title>, 
            "preview": <created preview>,
            "lyrics_song": <created lyrics_song>
        },
        { 
            "id": <created id>,
            "artist": <created artist>,
            "title": <created title>, 
            "preview": <created preview>,
            "lyrics_song": <created lyrics_song>
        },
        { 
            "id": <created id>,
            "artist": <created artist>,
            "title": <created title>, 
            "preview": <created preview>,
            "lyrics_song": <created lyrics_song>
        },
        { 
            "id": <created id>,
            "artist": <created artist>,
            "title": <created title>, 
            "preview": <created preview>,
            "lyrics_song": <created lyrics_song>
        },
        { 
            "id": <created id>,
            "artist": <created artist>,
            "title": <created title>, 
            "preview": <created preview>,
            "lyrics_song": <created lyrics_song>
        },
    ]
}
```
---
