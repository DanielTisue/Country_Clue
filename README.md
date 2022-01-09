# Country_Clue
Country_Clue is a country music blog web application which is a duplicate application of www.donegonecountry.com. This application intentionally has less security which allows any user to be able to register, login, and CRUD articles.  

## Motivation
It was important to have an application that could be used as a development application in order to test, explore, and showcase features to other developers and potential employers. 

## Tech/framework used
<b>Built with</b>
- MERN (MongoDB, ExpressJs, ReactJs, NodeJs).
### Other Dependencies Used
  * JWT tokens
  * Cloudinary API
  * CKEditor
  * React-router-dom     
  * multer
  * multer-storage-cloudinary
  * Html form sanitizer
  

## Features
This project uses restful routing, nosql data models with MongoDb, user JWT token authentication, async, and image upload capability. The client side uses react which sends requests to an express api for both authenticaion and CRUD operations.

## API Reference
- Cloudinary API (image upload): 
https://cloudinary.com/documentation 


## Production
You can visit the production version at https://www.donegonecountry.com. Please be aware that your accesbility to the site is limited to that of a User and not an Admin. You will not be able to experiece admin priveleges such as logging in, creating, deleting, editing articles. You will be able to read articles and like articles. 

## Credits
All current photos from https://www.unsplash.com :
* The production app credits Photos within the articles with a link to the artist.

