# RentalCar - Web Application for Car Rentals

## 🚗 Project Description

**RentalCar** is a modern web application developed for a car rental company. It allows users to browse available cars, apply filters, save favorites, and make bookings—all in a responsive and user-friendly interface.

## ✨ Key Features

- **Homepage** with an eye-catching banner and call to action  
- **Car Catalog** with filtering options by:
  - Car brand
  - Rental price
  - Mileage range (min/max)
- **Car Details Page** with complete vehicle information
- **Booking Form** with validation and notifications
- **Favorites List** with add/remove support
- **Pagination** with a "Load More" button
- **Responsive Design** for mobile, tablet, and desktop devices

## 🛠️ Tech Stack

- **React 18** – Core UI library
- **Vite** – Lightning-fast development bundler
- **Redux Toolkit** – State management
- **React Router** – Client-side routing
- **CSS Modules** – Scoped styling for components
- **Redux Persist** – Persisting state to `localStorage`

## 🌐 API Integration

The app uses a RESTful API for data operations:
- Fetch filtered car listings
- Retrieve details of a specific car
- Get available car brands

## 🚀 Installation & Setup

### Prerequisites

- Node.js v16 or higher
- npm or yarn

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/rental-car.git
cd rental-car

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── App/             # Main app wrapper
│   ├── AppBar/          # Navigation bar
│   ├── BookingForm/     # Booking form
│   ├── CarCard/         # Car preview card
│   ├── FilterBar/       # Catalog filters
│   └── ...
├── pages/               # Application routes
│   ├── HomePage/        # Homepage
│   ├── CatalogCarsPage/ # Catalog with filters
│   ├── Car/             # Car detail view
│   └── FavoritesPage/   # User's saved cars
├── redux/               # Global state (Redux)
│   ├── cars/            # Car-related slice
│   └── selectors/       # Memoized selectors
└── services/            # API service logic
```

## 📖 Usage Guide

### 🔎 Navigation

- **Home Page** – view banner and access the car catalog
- **Catalog** – browse all cars with filtering options
- **Car Details** – full information + booking form
- **Favorites** – access your saved cars

### 🔧 Filtering Cars

1. Select a car brand from the dropdown
2. Enter desired rental price
3. Set mileage range (from/to)
4. Click **Search** to apply filters

### ❤️ Favorites

- Click the heart icon on a car to add/remove from favorites  
- Go to the **Favorites** page to view your list

### 📝 Booking a Car

1. Open the desired car’s detail page
2. Fill in the booking form
3. Click **Submit**
4. A notification will confirm successful booking

## 👤 Author

**Your Name** – Frontend Developer

## 📄 License

This project is licensed under the **MIT License**.