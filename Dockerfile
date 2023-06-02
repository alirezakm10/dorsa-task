# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Start the app in development mode
CMD ["npm", "run", "dev"]
