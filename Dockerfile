FROM node:18

RUN apt-get update && apt-get install -y 
   
# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if it exists
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port (if needed for your application)
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
