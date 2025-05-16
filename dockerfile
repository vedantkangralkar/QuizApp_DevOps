FROM node:18

WORKDIR /app

# Backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all source code
COPY backend ./backend
COPY frontend ./frontend

# Install concurrently globally to run both apps together
RUN npm install -g concurrently

# Expose both ports
EXPOSE 5000 3000

# Start backend and frontend simultaneously
CMD ["concurrently", \
     "npm --prefix backend start", \
     "npm --prefix frontend run dev"]
