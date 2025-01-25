# Hydrosat- Sentiment Analysis Application Documentation

## Architecture Overview

The application follows a standard three-tier architecture:

1. **Frontend Layer**

   - Next.js React application
   - jest and react-testing library for automated tests
   - Tailwind CSS for styling
   - Responsive design for mobile, tab, and destop screen sizes
   - Framer motion and css for slight animations
   - Role-based access control (admin vs user)

2. **Backend Layer**

   - Node.js (v18.x) with Express
   - Jest for automated testing
   - RESTful API endpoints
   - Sentiment analysis using 'sentiment' npm package

3. **Data Layer**
   - PostgreSQL local (development)
   - Neon PostgreSQL (production)
   - Sqlite (testing)
   - Structured schema with users and feedback tables

## Database Structure

### Feedback Table

- Primary key: uuid (UUID)
- user_uuid (INTEGER) - Foreign key to users table
- text (TEXT) - Limited to 1000 characters
- sentiment (VARCHAR) - 'GOOD', 'BAD', or 'NEUTRAL'
- score (FLOAT) - Raw sentiment score
- created_at (DATE)

## API Endpoints

### POST /api/feedback

- Purpose: Submit new feedback with sentiment analysis
- Request body: { text: string, user: user_entity }
- Response: Created feedback object with sentiment analysis

### GET /api/feedback

- Purpose: Retrieve feedback entries
- Role Based Access Control: Admin Only
- Response: Array of feedback entries with sentiment data

## Security Considerations

- Input validation for feedback text length
- Role-based access control for admin features

## CI/CD Workflow

### Pipeline Location

The CI/CD workflow files are located in `.github/workflows/`:

- `client.yaml`: Defines the pipeline for the frontend.
- `server.yaml`: Defines the pipeline for the backend.

### Workflow Actions

1. Automated linting, testing, and building of the frontend and backend codebases.
2. Deployment of the frontend and backend applications to Vercel upon successful builds.

---

## How to Run Locally

### Local Development - Server

1. Navigate to server directory`cd server`
2. Configure environment variables rename `.env.local` to `.env`
3. Install dependencies: `yarn install`
4. Run tests: `yarn tests`
5. Start server: `yarn dev`

### Local Development - Client

1. Navigate to client directory`cd client`
2. Install dependencies: `yarn install`
3. Run tests: `yarn tests`
4. Start server: `yarn dev`

## Deployment

Both the frontend and backend were deployed using **Vercel** for simplicity and scalability. To interact with the application live, head to the url below.

- **Frontend Deployment URL:** [https://hydrosa.vercel.app](https://hydrosa.vercel.app)

---

## Bonus Features

1. **Cloud Deployment:** Both frontend and backend are hosted on Vercel.
2. **CI/CD Pipelines:** Automated deployment pipelines for both client and server applications.
3. **Blockchain Integration** Connect to metamask and retrieve wallet address.
