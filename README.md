# Todo App - ReactJS Side

This side is client side of Todo App.<br>
Server Side : [Spring Boot](https://github.com/eeness23/todoAppSpring)

## Features 
- Session authenticate with JWT. Default 90 second. Every 90 second user must reauthenticate.You can change the time from Server side.
- User registration
- User login

- Create to-do list. Each user will be able to have multiple to-do lists. Each to-do list will have a name.
- Update to-do list
- List of to-do lists.

- Delete to-do list

- Add to-do item to existing to-do list.

- Add dependency between to-do items. To-do items which have dependency can not be completed if dependent to-do item is not completed.<br>

- Each to-do item have a Id, Name, Description, Create date, Start Date, Update Date, End Date and Status.

- Mark to-do item as "Completed or Not Completed".

- Order to-do items on a to-do list by Id, Name, End Date.

- Dynamic Filter to-do items by Id, Name , Status. 

### Installing
Firstly you have to setup "npm" to system.<br>
Then you can run the application by typing the following codes.
**The server side of Todo App must be run. - [Spring Boot](https://github.com/eeness23/todoAppSpring "Google's Homepage")**
```
npm install
npm start
```

### A Important Note
This note is about dependency between to-do items.<br>
You can add more than one child-item. But each to-do item can have only one parent-item.<br>

_For Example_ <br>

List of to-do items : 1,2,3,4,5,6,7,8,9 <br>
Parent -> Childs <br>
<img src="https://png.pngtree.com/svg/20170510/418329c59c.png" alt="drawing" width="15"/> 1 -> 2,3   <br>
<img src="https://png.pngtree.com/svg/20170510/418329c59c.png" alt="drawing" width="15"/> 2 -> -   <br>
<img src="https://png.pngtree.com/svg/20170510/418329c59c.png" alt="drawing" width="15"/> 3 -> 4   <br>
<img src="https://png.pngtree.com/svg/20170510/418329c59c.png" alt="drawing" width="15"/> 6 -> 1,2 <br>

<img src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/43-512.png" alt="drawing" width="15"/> 7 -> 3  You cant. Because item 3 has parent(1). 

### Pictures

##### Login

![alt text](https://i.ibb.co/6bQSVqc/Screenshot-from-2019-07-29-02-48-08.png)

##### Homepage ( List to-do)

![alt text](https://i.ibb.co/JHLDLv7/Screenshot-from-2019-07-29-02-48-24.png)

##### Create Task - Update Task

![alt text](https://i.ibb.co/YkqMn9c/Screenshot-from-2019-07-29-02-48-44.png)

##### Filter items with "abc"

![alt text](https://i.ibb.co/V01wN3Y/Screenshot-from-2019-07-29-02-47-33.png)

##### Register

![alt text](https://i.ibb.co/yFFQ3Vq/Screenshot-from-2019-07-29-02-54-52.png)

##### Response Token ( JWT )

![alt text](https://i.ibb.co/ByzN86v/Screenshot-from-2019-07-29-03-10-34.png)

## Built With

* [ReactJs](https://reactjs.org/) - JS library
* [JWT](https://jwt.io/) - Dependency Management
* [Bootstrap](https://getbootstrap.com/) - Css framework

## Authors

* **Enes Demirbaş**  - [Linkedin](https://www.linkedin.com/in/enesdemrbas) - [Github](https://github.com/eeness23) <br>

    Email : enesdemirbas95@gmail.com
