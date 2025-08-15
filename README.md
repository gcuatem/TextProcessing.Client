# TextProcessing.Client

This is the Frontend part of this excercise, it is build in:
- React / vite
- Docker

# Steps to run locally

- clone this repo
- Run npm install
- to run local without container just run npm run dev
- to run from a container execute below commands:

  ```
  docker build --build-arg VITE_API_URL=http://localhost:8080/api/Processing -t processing-fe-img .
  
  docker run -d -p 80:80 --name processing-fe processing-fe-img
  ```

- Test the App with this request:
  
  ```
    http://localhost/

    http://localhost:80/
  ```
  
- The Backend process should be running too, if all is set properly you should see the response like this
<img width="226" height="461" alt="image" src="https://github.com/user-attachments/assets/14879b95-f2c8-4aef-8e16-9c498b97a1c3" />

