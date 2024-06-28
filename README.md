# Travel Application

This project is a complete travel application, consisting of a Flutter frontend and a Node.js backend. The backend handles tasks such as file uploads, data management, and API endpoints, while the frontend provides a user-friendly interface for interaction. The application integrates Cloudinary for file uploads and is deployed on AWS, ensuring scalability and security.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the `backend` directory:
   ```sh
   cd your-repo/backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Frontend

1. Navigate to the `app` directory:
   ```sh
   cd your-repo/app
   ```
2. Install Flutter dependencies:
   ```sh
   flutter pub get
   ```

## Configuration

### Backend

1. Create a `.env` file in the `backend` directory and add the following environment variables mention in `.env.example` file in respective folder:


### Frontend

1. Update the API endpoint in the Flutter app to point to your backend server. This can typically be done in a configuration file or a constants file.

## Usage

### Backend

1. Start the server:
   ```sh
   npm start
   ```
2. The server will be running on `http://localhost:5000`.

### Frontend

1. Run the Flutter app:
   ```sh
   flutter run
   ```
2. The app will be running on your connected device or emulator.

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register a new user.
- `POST /api/v1/auth/login` - Login a user.

### Profile
- `GET /api/v1/profile` - Get user profile.
- `PUT /api/v1/profile` - Update user profile.

### Admin
- `GET /api/v1/admin/users` - Get all users (admin only).

### Owner
- `POST /api/v1/owner/buses` - Add a new bus (owner only).

### Universal
- `GET /api/v1/universal/stops` - Get all stops.

### Upload
- `POST /api/v1/upload` - Upload an image to Cloudinary.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **Flutter**: UI toolkit for building natively compiled applications.
- **Cloudinary**: Cloud-based image and video management.
- **GitHub Actions**: CI/CD pipelines.
- **AWS**: Deployment platform (EC2, S3, RDS).

## Deployment

This project is deployed on AWS, leveraging the following services:
- **EC2**: For server hosting.
- **S3**: For static file storage.
- **RDS**: For managed database services.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
