
# First Clean Example

## Description

This repository provides an example of a web application built with Node.js. The First Clean project demonstrates how to set up and use Node.js to create a clean architecture for building scalable and maintainable web applications. This is useful for developers looking to implement clean architecture principles in their projects.

## Requirements

- Node.js
- npm or Yarn for package management

## Mode of Use

1. Clone the repository:
   ```bash
   git clone https://github.com/ferrerallan/firstClean.git
   ```
2. Navigate to the project directory:
   ```bash
   cd firstClean
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm start
   ```

## Implementation Details

- **src/**: Contains the application source code following clean architecture principles.
- **public/**: Contains the static assets and the HTML template.
- **package.json**: Configuration file for the Node.js project, including dependencies.

### Example of Use

Here is an example of how to set up a basic Node.js server with Express:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

This code sets up a basic Node.js server using Express that responds with "Hello, World!" to GET requests at the root URL.

## License

This project is licensed under the MIT License.

You can access the repository [here](https://github.com/ferrerallan/firstClean).
