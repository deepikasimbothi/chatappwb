import express from 'express'
import {server, app} from './socket/socket.js'
import dotenv from 'dotenv' 
import cookieParser from 'cookie-parser'
import path from 'path'
//routes
import authRoutes from './routes/auth-routes.js'
import messageRoutes from './routes/message-route.js'
import usersRoutes from './routes/users-route.js'

import connectDb from './config/db.js'

dotenv.config()

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000


app.use(
  cors({
    origin:
      "https://mg-mern-chatv1.onrender.com", // Allow this origin
  })
);

//middlewares
app.use(express.json())
app.use(cookieParser())

//route middlewares
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', usersRoutes)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})


connectDb();
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})