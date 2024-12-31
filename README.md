# Careers

## Project Context

This project provides a web application for managing job offers, applications, and user authentication. It includes features for job seekers to browse job offers, apply to jobs, and track the status of their applications. It also includes an admin interface for managing applications and reviewing candidate statuses.

### Features

#### 1. **Job Offers Consultation**

- Display a list of available job offers by consuming an external API.
- Allow users to search and filter job offers by title, location, contract type, etc.

#### 2. **Job Application Management**

- User registration and login functionality.
- Directly apply to job offers from the application.
- Track the status of applications (Pending, Accepted, Rejected).

#### 3. **Server-Side Rendering (SSR)**

- Utilizes SSR for displaying individual application details and listing applications.

#### 4. **API Conventions**

- Follows RESTful API conventions with pagination support (`page`, `size`, `offset`).

## Technologies Used

- **Framework**: Next.js
- **UI**: Tailwind CSS
- **State Management**: React Context
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Token)
- **CI/CD**: GitHub Actions
- **API Testing**: Jest
- **API Documentation**: PostMan

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm
- MongoDB

### Steps to Run the Project Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ahmed-hounati/careers.git
   cd careers
   ```
