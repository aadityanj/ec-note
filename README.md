#Project name : Ec-Note

#Description 

Ec-Note is a web application designed for notes taking, maintaining the revisions, restoring the revisions. It allows users to create notes, edit notes, delete notes, restore old notes from the history which notes are plaintexts. 

#Installation
- Install Latest LTS version of [Node JS](https://nodejs.org/en/) globally.  
- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Install [Yarn](https://yarnpkg.com/en/docs/getting-started) Package manager.
- To download the project, follow the below instructions
  - execute this below commands one by one in your teminal 
    ```
      $ git clone https://github.com/aadityanj/ec-note.git
      $ cd ec-note
      $ yarn install
    ```    
- Get the backend server for Ec-Note running [Ec-Note-Backend](https://github.com/aadityanj/ec-note-restapi)     
- Add your backend server url in below configuration file
  - step 1 
  ```
    $ cd ec-note
    $ cd src
   ```
  - step2 
    Open `url.js` in any text editor and change it to your backend server url accordingly   
- To run the project in the development mode
  - 
   ```
    $ cd ec-note
    $ yarn start
   ```
- Deployment
'yarn run build` creates a `build` directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

#Appflow


#You're done!

