FROM node:18

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy rest of backend and frontend code
COPY backend ./backend
COPY frontend ./frontend

# Build frontend for production (npm run build)
RUN cd frontend && npm run build

EXPOSE 5000

ENV NODE_ENV=production

# Start backend (which should serve frontend build)
CMD ["npm", "start", "--prefix", "backend"]
