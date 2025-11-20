# Security Policy

## Overview

This document outlines the security measures implemented in RentOrbits to protect against common vulnerabilities and attacks.

## Security Features Implemented

### 1. Input Validation & Sanitization

**Implementation:**
- ✅ Express-validator for comprehensive input validation
- ✅ MongoDB sanitization to prevent NoSQL injection
- ✅ XSS protection through input sanitization
- ✅ Type checking and format validation for all inputs

**Validation Rules:**

#### User Registration
- Name: 2-50 characters, letters and spaces only
- Email: Valid email format with normalization
- Password: Minimum 8 characters with complexity requirements
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (@$!%*?&)

#### Booking Creation
- Car ID: Valid MongoDB ObjectId
- Start Date: ISO8601 format, cannot be in the past
- End Date: Must be after start date, maximum 30 days duration
- Automatic date validation and conflict checking

#### Car Management
- Name: 2-100 characters
- Price: Positive number
- Transmission: Only 'automatic' or 'manual'
- Fuel Type: Only 'petrol', 'diesel', 'electric', or 'hybrid'
- Seats: 1-50 range
- Image: Valid URL format

### 2. Rate Limiting

**Implementation:**
- General API rate limit: 100 requests per 15 minutes per IP
- Authentication endpoints: 5 requests per 15 minutes per IP
- Prevents brute force attacks and DDoS attempts

**Protected Endpoints:**
- `/api/users/login` - Stricter limit (5 req/15min)
- `/api/users/register` - Stricter limit (5 req/15min)
- All other `/api/*` routes - Standard limit (100 req/15min)

### 3. Security Headers (Helmet)

**Protections:**
- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options (Clickjacking protection)
- ✅ X-Content-Type-Options (MIME sniffing protection)
- ✅ Strict-Transport-Security (HTTPS enforcement)
- ✅ X-XSS-Protection
- ✅ Referrer-Policy

### 4. NoSQL Injection Prevention

**Implementation:**
- Express-mongo-sanitize middleware
- Removes `$` and `.` characters from user input
- Prevents MongoDB operator injection
- Validates all MongoDB ObjectIds

**Example Attack Prevention:**
```javascript
// Malicious input (prevented):
{ "email": { "$gt": "" }, "password": "anything" }

// Sanitized to:
{ "email": "[object Object]", "password": "anything" }
```

### 5. Parameter Pollution Protection

**Implementation:**
- HPP (HTTP Parameter Pollution) middleware
- Prevents duplicate parameter attacks
- Protects against query string manipulation

### 6. Request Size Limits

**Limits:**
- JSON body: 10kb maximum
- URL-encoded body: 10kb maximum
- Prevents payload-based DoS attacks

### 7. CORS Configuration

**Settings:**
- Origin whitelist (configurable via environment)
- Credentials support enabled
- Proper preflight handling

### 8. Authentication & Authorization

**Security Measures:**
- ✅ JWT-based authentication
- ✅ Bcrypt password hashing (cost factor: 12)
- ✅ Token expiration (24 hours)
- ✅ Role-based access control (user/admin)
- ✅ Protected routes with middleware

**Password Security:**
- Minimum 8 characters
- Complexity requirements enforced
- Salted hashing with bcrypt (12 rounds)
- Never stored in plain text

### 9. Error Handling

**Implementation:**
- Generic error messages to prevent information leakage
- Detailed logging for debugging (server-side only)
- Stack traces only in development mode
- Proper HTTP status codes

### 10. Database Security

**Measures:**
- Connection string in environment variables
- Mongoose schema validation
- Query sanitization
- Graceful connection handling

## Environment Variables

Required security-related environment variables:

```env
# JWT Secret (use strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/rentorbits

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Server Port
PORT=5000

# Node Environment
NODE_ENV=production
```

## Security Best Practices

### For Developers

1. **Never commit sensitive data**
   - Use `.env` files (already in `.gitignore`)
   - Rotate secrets regularly
   - Use strong, unique secrets

2. **Input Validation**
   - Always validate user input
   - Use provided validation middleware
   - Never trust client-side validation alone

3. **Error Handling**
   - Don't expose sensitive information in errors
   - Log errors server-side for debugging
   - Return generic error messages to clients

4. **Dependencies**
   - Keep dependencies updated
   - Run `npm audit` regularly
   - Review security advisories

5. **Authentication**
   - Use provided authentication middleware
   - Implement proper authorization checks
   - Validate user permissions for each action

### For Deployment

1. **HTTPS Only**
   - Always use HTTPS in production
   - Configure SSL/TLS certificates
   - Enable HSTS headers

2. **Environment Configuration**
   - Set `NODE_ENV=production`
   - Use strong JWT secrets
   - Configure proper CORS origins

3. **Monitoring**
   - Monitor rate limit violations
   - Track failed authentication attempts
   - Set up error logging and alerting

4. **Database**
   - Use MongoDB authentication
   - Restrict database access by IP
   - Regular backups
   - Enable MongoDB encryption at rest

## Vulnerability Reporting

If you discover a security vulnerability, please email: [security@rentorbits.com]

**Please do not:**
- Open public issues for security vulnerabilities
- Disclose vulnerabilities before they are fixed

## Security Checklist

- [x] Input validation on all endpoints
- [x] Rate limiting implemented
- [x] NoSQL injection prevention
- [x] XSS protection
- [x] CSRF protection (via SameSite cookies)
- [x] Security headers configured
- [x] Password hashing with bcrypt
- [x] JWT authentication
- [x] Role-based authorization
- [x] Request size limits
- [x] Parameter pollution prevention
- [x] Error handling without information leakage
- [x] CORS properly configured
- [x] MongoDB sanitization
- [x] Graceful error handling

## Dependencies

Security-related packages:

```json
{
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.1.5",
  "express-validator": "^7.0.1",
  "express-mongo-sanitize": "^2.2.0",
  "hpp": "^0.2.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0"
}
```

## Testing Security

### Manual Testing

1. **Test Rate Limiting:**
```bash
# Should block after 5 attempts
for i in {1..10}; do curl -X POST http://localhost:5000/api/users/login; done
```

2. **Test Input Validation:**
```bash
# Should return validation errors
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"a","email":"invalid","password":"weak"}'
```

3. **Test NoSQL Injection:**
```bash
# Should be sanitized and fail
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":{"$gt":""},"password":"anything"}'
```

### Automated Testing

Run security audit:
```bash
npm audit
npm audit fix
```

## Updates and Maintenance

- Review and update dependencies monthly
- Monitor security advisories
- Update this document when adding new security features
- Conduct security reviews before major releases

## Compliance

This implementation follows:
- OWASP Top 10 security guidelines
- Node.js security best practices
- Express.js security recommendations
- MongoDB security checklist

## Version History

- **v1.0.0** (Current) - Initial security implementation
  - Input validation and sanitization
  - Rate limiting
  - Security headers
  - NoSQL injection prevention
  - Authentication and authorization

---

Last Updated: November 2025
