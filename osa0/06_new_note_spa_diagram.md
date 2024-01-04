```mermaid

sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: main.css file
    deactivate Server
    Note right of Browser: Fetching the main.css file, which is the stylefile defining the outlook of the webpage.

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate Server
    Server-->>Browser: spa.js JavaScript file
    deactivate Server
    Note right of Browser: Browser starts executing the JavaScript code that fetches the data in JSON format from the server.

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: [{"content": "mermaid", "date": "2024-01-02T11:21:21.588Z"}, ... ]
    deactivate Server    
    Note right of Browser: Browser executes the callback function that renders the notes and lists them with bullet points.

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Server-->>Browser: {content: "Sotto zero", date: "2024-01-04T18:10:15.507Z"}
    deactivate Server
    Note right of Browser: Browser sends POST request containing the new note in JSON format. Server replies with 201 created, no redirecting so the browser <br> stays on the same page, because code in spa.js takes care of sending/updating the new note to the page. 

```
