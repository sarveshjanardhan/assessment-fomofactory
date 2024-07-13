SETUP:

MONGODB:

    1. Set up a MongoDB Atlas free tier account with Node.js as the driver
    2. Add .env file in the folder backend
    2. Copy connection string from Atlas and assign it to MONGODB_URI variable inside the .env file

BACKEND:

    1. Navigate to backend and run npm i to install all dependancies
    2. Run npm run start. 
    3. The app will start polling data from coingecko every 5 seconds for a set of cryptocurrencies
    3. On localhost:3000 requests will be sent by frontend to fetch data from MongoDB using an 'get' API

FRONTEND:

    1. Run npm run start. 
    2. Run npm run dev under my-app
