# CodeForces Profile Tracker for TLE Eliminators

A comprehensive MERN stack application designed for tracking and managing CodeForces profiles.

**Created by:** Nikhil

## Introduction

This project is a full-stack web application developed for TLE Eliminators to efficiently track and monitor competitive programming progress on CodeForces. The application provides real-time profile synchronization, detailed analytics, and automated email notifications to help students and instructors stay updated with their competitive programming journey.


## Table of Contents

- [Introduction](#-introduction)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Backend Architecture](#-backend-architecture)
- [Application Screenshots](#-application-screenshots)
- [Features in Detail](#-features-in-detail)
- [Backend API Documentation](#-backend-api-documentation)
- [Deployment Info](#-deployment-info)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)

---

## ✨ Key Features

### Profile Management
- **Add/Edit/Delete Tracked Profiles** - Manage multiple CodeForces profiles with ease
- **Real-time Profile Sync** - Automated synchronization with CodeForces API
- **Profile Analytics Dashboard** - Comprehensive overview of all tracked profiles

### Performance Tracking
- **Current & Maximum Rank Tracking** - Monitor rank progression over time
- **Rating Analytics** - Track current rating and maximum rating achieved
- **Contest Performance** - Detailed contest rating history and statistics
- **Submission Heatmap** - Visual representation of daily coding activity
- **Problem Solving Statistics** - Comprehensive breakdown of solved problems by difficulty and tags

### Automation & Notifications
- **Automated Profile Sync Cronjobs** - Regular background synchronization
- **Manual Email Triggers** - Send notifications on-demand
- **Custom Email Templates** - Edit email templates using Monaco Editor
- **Scheduled Notifications** - Automated progress reports and reminders

### Advanced Features
- **Monaco Editor Integration** - Professional code editor for email template customization
- **Responsive Design** - Optimized for desktop and mobile devices
- **Smooth Animations** - Enhanced user experience with Framer Motion
- **Modern UI Components** - Beautiful interface built with Shadcn/UI

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Modern component library
- **Framer Motion** - Production-ready motion library
- **Monaco Editor** - VS Code editor for the web
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for data storage
- **Prisma ORM** - MongoDB object modeling

## 📁 Backend Architecture

## 📷 Application Screenshots


## 📡 Backend API Documentation

**Base URL:** `https://nx-api.mrflyncodes.xyz/api/student`

### ➕ Add Student
**POST** `/students`
```json
{
  "email": "user@example.com",
  "name": "tourist",
  "codeforcesHandle": "tourist"
}
```
**Response**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": { "id": "...", "email": "...", "name": "...", "codeforcesHandle": "..." }
}
```

### 📝 Update Student
**PUT** `/students/:studentId/update`

### ❌ Delete Student
**DELETE** `/students/:studentId`

### 📈 Get Problem Stats
**GET** `/students/:studentId/problems?days=0`

### 🏆 Get Contest History
**GET** `/students/:studentId/contests?days=365`

### 🔄 Sync Data
**POST** `/students/:studentId/sync`

### 🔁 Update Handle
**PUT** `/students/:studentId/codeforces`

### ✉️ Toggle Email Reminders
**PUT** `/students/:studentId/email-reminders`

### 📬 Get Email Template
**GET** `/emailTemplate`

### 🛠️ Update Email Template
**PUT** `/emailTemplate`

**Standard Response Format**
```json
{
  "success": true,
  "message": "Your message",
  "data": { ... } // if applicable
}
```

---

## 🚀 Deployment Info



## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
