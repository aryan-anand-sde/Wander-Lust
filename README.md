# WanderLust 🏡✈️

A full-stack web application for discovering and sharing unique places to stay around the world. WanderLust is an Airbnb-inspired platform where users can browse listings, create their own properties, leave reviews, and connect with fellow travelers.

## 🌟 Features

- **User Authentication**: Secure signup/login system with Passport.js and local strategy
- **Property Listings**: Browse, create, edit, and delete accommodation listings
- **Image Upload**: Upload property images using Cloudinary for optimized storage
- **Reviews & Ratings**: Leave reviews and rate properties (1-5 stars)
- **Authorization**: Only listing owners can edit or delete their properties
- **Session Management**: Persistent sessions using MongoDB store
- **Flash Messages**: User-friendly feedback for all actions
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Backend

- **Node.js** (v24.9.0)
- **Express.js** (v5.2.1) - Web framework
- **MongoDB** with **Mongoose** (v9.0.1) - Database and ODM
- **Passport.js** - Authentication middleware
- **Express Session** - Session management with MongoDB store

### Frontend

- **EJS** - Templating engine
- **EJS Mate** - Layout support for EJS
- **Bootstrap** (CSS framework)
- **Custom CSS** - Additional styling

### Cloud Services

- **Cloudinary** - Image hosting and optimization
- **MongoDB Atlas** - Cloud database (recommended)

### Security & Validation

- **Joi** - Schema validation
- **Connect Flash** - Flash messages
- **Passport Local Mongoose** - Password hashing and salting

## 📁 Project Structure

```
Wander Lust/
├── app.js                 # Main application entry point
├── package.json           # Project dependencies
├── Schema.js              # Joi validation schemas
├── middlewares.js         # Custom middleware functions
├── cloudConfig.js         # Cloudinary configuration
├── controllers/           # Route controllers (MVC pattern)
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/                # Mongoose models
│   ├── Listing.js
│   ├── Review.js
│   └── User.js
├── routes/                # Express routes
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── views/                 # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/                # Static assets
│   ├── css/
│   └── Js/
├── utility/               # Helper utilities
│   ├── ExpressError.js
│   └── WrapAsync.js
└── init/                  # Database initialization scripts
    ├── data.js
    └── init.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v24.9.0 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aryan-anand-sde/Wander-Lust.git
   cd Wander-Lust
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   MONGODB_URL=your_mongodb_connection_string
   SECRET=your_session_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. **Initialize the database (optional)**

   If you want to seed the database with sample data:

   ```bash
   node init/init.js
   ```

5. **Start the application**

   ```bash
   node app.js
   ```

6. **Access the application**

   Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## 📝 Usage

### For Users

1. **Sign Up**: Create a new account to get started
2. **Browse Listings**: View all available properties
3. **View Details**: Click on any listing to see full details and reviews
4. **Leave Reviews**: Share your experience with ratings and comments

### For Property Owners

1. **Create Listing**: Add your property with images, description, and pricing
2. **Manage Listings**: Edit or delete your own properties
3. **Monitor Reviews**: See what guests are saying about your property

## 🔒 Security Features

- Password hashing using passport-local-mongoose
- Session-based authentication
- CSRF protection
- HTTP-only cookies
- Input validation with Joi
- Authorization checks for protected routes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Aryan Anand**

- GitHub: [@aryan-anand-sde](https://github.com/aryan-anand-sde)

## 🙏 Acknowledgments

- Inspired by Airbnb's user interface and functionality
- Built as part of web development learning journey
- Thanks to the open-source community for amazing tools and libraries

---

⭐ If you found this project helpful, please give it a star!
