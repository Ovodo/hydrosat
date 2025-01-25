# Sentiment Analysis Application Documentation

## Architecture Overview

The application follows a standard three-tier architecture:

1. **Frontend Layer**
   - Next.js React application
   - Tailwind CSS for styling
   - Responsive design for all screen sizes
   - Role-based access control (ADMIN vs USER)

2. **Backend Layer**
   - Node.js with Express
   - RESTful API endpoints
   - Sentiment analysis using 'sentiment' npm package
   - JWT authentication middleware

3. **Data Layer**
   - PostgreSQL database
   - Structured schema with users and feedback tables
   - Indexed for optimal query performance

## Database Structure

### Users Table
- Primary key: id (SERIAL)
- username (VARCHAR)
- role (VARCHAR) - Either 'USER' or 'ADMIN'
- created_at (TIMESTAMP)

### Feedback Table
- Primary key: id (SERIAL)
- user_id (INTEGER) - Foreign key to users table
- text (TEXT) - Limited to 1000 characters
- sentiment (VARCHAR) - 'GOOD', 'BAD', or 'NEUTRAL'
- score (NUMERIC) - Raw sentiment score
- created_at (TIMESTAMP)

## API Endpoints

### POST /api/feedback
- Purpose: Submit new feedback with sentiment analysis
- Request body: { text: string, userId: number }
- Response: Created feedback object with sentiment analysis

### GET /api/feedback
- Purpose: Retrieve feedback entries
- Query parameters: isAdmin (boolean)
- Response: Array of feedback entries with sentiment data

## Security Considerations

- Input validation for feedback text length
- Role-based access control for admin features
- SQL injection prevention using parameterized queries
- CORS configuration for API security

## Deployment Instructions

1. Set up PostgreSQL database and run schema migrations
2. Configure environment variables
3. Install dependencies: `npm install`
4. Build frontend: `npm run build`
5. Start server: `npm start`

The application is designed to be easily deployable to cloud platforms like Heroku or AWS.
