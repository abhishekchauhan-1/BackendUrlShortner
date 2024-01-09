
# Shortly URL Shortener

Shortly is a simple URL shortening service that allows users to create short aliases for long URLs. This repository contains the frontend React application for Shortly.

## Table of Contents
- [Hosted URL](#hosted-url)
- [GitHub Repositories](#github-repositories)
  - [Backend Repository](#backend-repository)
  - [Frontend Repository](#frontend-repository)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Login](#login)
  - [Shorten URL](#shorten-url)
  - [View URL Statistics](#view-url-statistics)
  - [Logout](#logout)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Hosted URL
- [Shortly URL Shortener](https://urlshortner-8ah6.onrender.com)

## GitHub Repositories

### Backend Repository
- [Shortly Backend Repository](https://github.com/abhishekchauhan-1/BackendUrlShortner)

### Frontend Repository
- [Shortly Frontend Repository](https://github.com/abhishekchauhan-1/urlShortner)

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB instance for database storage.
- JWT Token for securing routes.
- Passport Local for authentication.

### Installation
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/abhishekchauhan-1/urlShortner-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd urlShortner-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

## Usage

### Login
- Access the login page at [https://urlshortner-8ah6.onrender.com/auth/signin](https://urlshortner-8ah6.onrender.com/auth/signin).
- Enter your credentials to log in.

### Shorten URL
- Once logged in, you can shorten a URL by entering the original URL in the input field and clicking the "Create Short URL" button.

### View URL Statistics
- Navigate to [https://urlshortner-8ah6.onrender.com/link/urls](https://urlshortner-8ah6.onrender.com/link/urls) to view statistics for the URLs you have created.
- The dashboard displays the total number of URLs created and the count of expired URLs.

### Logout
- Logout functionality is handled through the frontend by clearing cookies from localStorage.

## API Endpoints

- **Login**
  - Endpoint: `https://urlshortner-8ah6.onrender.com/auth/signin`
  - Method: `POST`

- **Shorten URL**
  - Endpoint: `https://urlshortner-8ah6.onrender.com/link/shorten`
  - Method: `POST`

- **View URL Statistics**
  - Endpoint: `https://urlshortner-8ah6.onrender.com/link/urls`
  - Method: `GET`

## Technologies Used

- React
- Node.js
- MongoDB
- JWT for authentication
- Passport Local for authentication
- Express.js
- Mongoose

## License
- Author: Abhishek Singh Chauhan
- This project is licensed under the [MIT License](LICENSE).