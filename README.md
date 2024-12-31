# Job Application System

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

#### 3. **Admin Panel**

- Administrators can view received applications.
- Admins can add notes or update the status of applications.

#### 4. **Server-Side Rendering (SSR)**

- Utilizes SSR for displaying individual application details and listing applications.

#### 5. **API Conventions**

- Follows RESTful API conventions with pagination support (`page`, `size`, `offset`).

## Technologies Used

- **Framework**: Next.js
- **UI**: Tailwind CSS
- **State Management**: React Context / Redux
- **Database**: MongoDB with Mongoose (or PostgreSQL)
- **Authentication**: JWT (JSON Web Token) or third-party service
- **CI/CD**: GitHub Actions or GitLab CI
- **API Testing**: Jest, Supertest
- **API Documentation**: Swagger

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB or PostgreSQL (depending on your configuration)

### Steps to Run the Project Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/job-application-system.git
   cd job-application-system
   ```