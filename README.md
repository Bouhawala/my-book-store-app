# my-book-store-app

This is my book store application built with Angular 12, Json-server.

This web application allows us to manage our users, create them, view them in detail, affect books to them, edit and delete them. Each user has a firstname, a lastname, and list of books. And each book has a title, and an author.

This application contains a users list section in which we can see and manage them (in the actions section in the table).

The state management of this application is implemented with NgRx.
The backend is a mock json-server db file.

To store or fetch data from the backend, NgRx actions and effects are used in addition to some Rxjs operators to guarantee a smooth and efficient data transfer, also to manage and catch error easely.