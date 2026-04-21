# PH Health Care Server

A robust, scalable backend service for a Healthcare Management System. Built with modern web technologies, this server handles user authentication, doctor-patient interactions, scheduling, and specialized healthcare administrative features.

## 🚀 Features

- **User Authentication & Authorization**: Secure login and registration using JWT and bcrypt. Role-based access control (Admin, Doctor, Patient).
- **Doctor Management**: Detailed doctor profiles, specialties management, and availability scheduling.
- **Patient Management**: Secure patient record handling and profile management.
- **Appointment Scheduling**: Complex scheduling logic for doctor-patient appointments, managing time slots and doctor availability.
- **Media Management**: Integrated with Cloudinary for secure upload and management of user avatars and medical documents.
- **Data Validation**: Request payload validation using Zod for type safety and error handling.
- **Database Management**: Powerful ORM with Prisma to ensure data integrity and easy schema migrations.

## 🛠️ Technology Stack

- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (via Prisma)
- **Validation**: [Zod](https://zod.dev/)
- **Authentication**: JWT & Bcrypt
- **File Uploads**: Multer & Cloudinary
- **Date Handling**: date-fns

## 📂 Project Structure

```text
src/
├── app/
│   ├── errors/        # Global error handlers
│   ├── Interfaces/    # TypeScript interfaces and types
│   ├── middlewares/   # Express middlewares (Auth, File upload, etc.)
│   ├── modules/       # Domain-driven feature modules
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── Doctor/
│   │   ├── DoctorSchedule/
│   │   ├── Patients/
│   │   ├── Schedule/
│   │   ├── Specialties/
│   │   └── User/
│   └── routes/        # Centralized application routes
├── config/            # Environment variables and configurations
├── helpers/           # Reusable helper functions
├── shared/            # Shared utilities and constants
├── app.ts             # Express app setup
└── server.ts          # Server entry point
```

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- PostgreSQL database

## 📦 Installation & Setup

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd ph_health-care_server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory. You will need to set up variables such as:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/ph_healthcare?schema=public"
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Prisma Setup**
   Generate the Prisma client and push the schema to your database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The server will start running on the port specified in your `.env` file.

## 📜 Available Scripts

- `npm run dev`: Starts the application in development mode with hot-reloading using `ts-node-dev`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the ISC License.
