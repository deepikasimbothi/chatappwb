import express from 'express'
import {server, app} from './socket/socket.js'
import dotenv from 'dotenv' 
import cookieParser from 'cookie-parser'

//routes
import authRoutes from './routes/auth-routes.js'
import messageRoutes from './routes/message-route.js'
import usersRoutes from './routes/users-route.js'

import connectDb from './config/db.js'

dotenv.config()


const PORT = process.env.PORT || 5000

//middlewares
app.use(express.json())
app.use(cookieParser())

//route middlewares
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', usersRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})  

connectDb();
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})