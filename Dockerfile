FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Copy source files
COPY . .

# Build TypeScript
RUN npm run build

FROM node:20-alpine

WORKDIR /app

# Copy built files
COPY --from=0 /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Install PM2
RUN npm install -g pm2

# Expose port according to the environment
EXPOSE 8000

# Start the app
CMD ["pm2-runtime", "dist/index.js"]
