/**
 * AI Scam Shield X - API Gateway
 * National Cyber Intelligence Platform
 * 
 * This is the main entry point for all API requests.
 * Handles authentication, rate limiting, and routes requests to appropriate services.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const winston = require('winston');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Winston logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true
}));

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: 900
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Stricter rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: 900
  }
});

app.use('/api/auth/login', authLimiter);

// JWT Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Role-based access control
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      apiGateway: 'up',
      aiService: 'up',
      graphService: 'up',
      notificationService: 'up'
    }
  });
});

// Service routes with proxy middleware
const services = {
  ai: process.env.AI_SERVICE_URL || 'http://localhost:8000',
  graph: process.env.GRAPH_SERVICE_URL || 'http://localhost:8001',
  notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8002',
  db: process.env.DB_SERVICE_URL || 'http://localhost:8003'
};

// AI Service routes
app.use('/api/ai', authenticateToken, createProxyMiddleware({
  target: services.ai,
  changeOrigin: true,
  pathRewrite: { '^/api/ai': '' },
  onError: (err, req, res) => {
    logger.error('AI Service Error:', err);
    res.status(503).json({ error: 'AI Service unavailable' });
  }
}));

// Graph Service routes
app.use('/api/graph', authenticateToken, createProxyMiddleware({
  target: services.graph,
  changeOrigin: true,
  pathRewrite: { '^/api/graph': '' },
  onError: (err, req, res) => {
    logger.error('Graph Service Error:', err);
    res.status(503).json({ error: 'Graph Service unavailable' });
  }
}));

// Notification Service routes
app.use('/api/notifications', authenticateToken, createProxyMiddleware({
  target: services.notification,
  changeOrigin: true,
  pathRewrite: { '^/api/notifications': '' },
  onError: (err, req, res) => {
    logger.error('Notification Service Error:', err);
    res.status(503).json({ error: 'Notification Service unavailable' });
  }
}));

// Admin routes (require superadmin role)
app.use('/api/admin', authenticateToken, requireRole(['superadmin', 'admin']), createProxyMiddleware({
  target: services.db,
  changeOrigin: true,
  pathRewrite: { '^/api/admin': '/admin' },
  onError: (err, req, res) => {
    logger.error('Admin Service Error:', err);
    res.status(503).json({ error: 'Admin Service unavailable' });
  }
}));

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Implement actual authentication with database
    // This is a mock implementation
    if (email === 'admin@aiscamshield.in' && password === 'admin123') {
      const token = jwt.sign(
        { 
          id: '1', 
          email, 
          role: 'superadmin',
          name: 'Super Admin'
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      
      logger.info(`User logged in: ${email}`);
      res.json({ token, user: { email, role: 'superadmin', name: 'Super Admin' } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // TODO: Implement actual user registration
    logger.info(`New user registered: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/refresh', authenticateToken, (req, res) => {
  const token = jwt.sign(
    { 
      id: req.user.id, 
      email: req.user.email, 
      role: req.user.role,
      name: req.user.name
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
  
  res.json({ token });
});

// Public API routes (limited access)
app.get('/api/public/stats', async (req, res) => {
  try {
    // TODO: Fetch actual stats from database
    res.json({
      totalUsers: 1200000,
      threatsBlocked: 50000000,
      activeAlerts: 234,
      uptime: 99.99
    });
  } catch (error) {
    logger.error('Stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
