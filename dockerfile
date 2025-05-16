FROM node:18-alpine

WORKDIR /app

# Copy root package files (for concurrently)
COPY package*.json ./
RUN npm install

# Copy and install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy and install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all source code
COPY . .

EXPOSE 3000 5000

CMD ["npm", "run", "dev"]
