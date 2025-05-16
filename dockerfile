FROM node:18-alpine

WORKDIR /app

# Install root dependencies (concurrently)
COPY package*.json ./
RUN npm install

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all source code
COPY . .

# Expose frontend and backend ports
EXPOSE 3000 5000

# Start both frontend and backend in dev mode
CMD ["npm", "run", "dev"]
