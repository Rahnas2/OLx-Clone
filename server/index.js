

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const usersModel = require('./models/users')
const productsModel = require('./models/products')
const authenticateToken = require('./middleware/jwtAuth')

const upload = require('./multer')


const PORT = process.env.PORT

const app = express()

mongoose.connect(process.env.MONGOD_URI)
    .then(() => console.log('database connected'))
    .catch(() => console.log('database not connected'))

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads'))


//routes
app.get('/api/users', async (req, res) => {
    console.log('hello')
    try {
        const users = await usersModel.find()
        res.json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})  

app.post('/api/signup', async (req, res) => {
    console.log('signup started')
    try {
        const { username, email, password } = req.body

        const user = await usersModel.findOne({email: email})

        if(user){
            res.status(404).json({msg: 'user already exist'})
            return 
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(password, salt)


        const data = {
            username: username,
            email: email,
            password: hashPassword 
        }


        const newUser = await usersModel.create(data)

        const payLoad = {
            userId: newUser._id,
            email: newUser.email 
        }


        const token = jwt.sign(payLoad , process.env.JWT_SECRET, {
            expiresIn: '48h',
        });

        res.status(201).json({msg:'success',user:newUser,token})
    } catch (error) {
        console.error('catch block',error)
        res.status(500).json({msg:'faild',error})
    }
})

app.post('/api/login', async (req, res) => {
    console.log('login started')
    try {
        console.log('inside try block')
        const { email, password } = req.body
        console.log('body:',req.body)
        const user = await usersModel.findOne({ email: email })
        
        if (!user) {
            res.status(404).json({ msg: 'invalid email' })
            return
        }
        console.log('user: ',user)

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            console.log('password is not match')
            res.status(404).json({ msg: 'invalid password' })
            return
        }

        const payLoad = {
            userId: user._id,
            email: user.email 
        }

        const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: '48h',
        });
        console.log('token', token)

        res.status(201).json({user,token})

    } catch (error) {
        console.log('catch bloack', error)
        res.status(500).json(error)
    }
})

app.get('/api/products', async (req, res) => {
    console.log('started fetching')
    try {
        const products = await productsModel.find()
        res.status(201).json(products)
    } catch (error) {
        console.log('catch ',error)
        res.status(500).json(error)
    }
})

app.get('/api/product:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await productsModel.findById(id)

        if (!product) {
            res.status(404).json({ message: 'produt not found' })
        }

        res.json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/api/products', authenticateToken, upload.single('image'), async (req, res) => {
    console.log('selling startted')
    
    try {
        const { category, brand, model, year, kilometers, no_owners, discription, price, mobile_no } = req.body
        console.log('body', req.body)

        const imageUrl = req.file ? `uploads/${req.file.filename}` : null

        const product = new productsModel({
            category,
            brand,
            model,
            year,
            kilometers,
            no_owners,
            discription,
            price,
            mobile_no,
            images: imageUrl 
        });

        const newProduct = await product.save();
        res.status(201).json({msg:'success', newProduct});

    } catch (error) {
        console.log('error',error)
        res.status(400).json({ msg: 'faild' });
    }
});

app.get('/api/verify-token', authenticateToken, (req,res) =>{
    console.log('veryfyied roudte')
    res.status(201).json({msg: 'success',user:req.user})
})


app.listen(PORT, () => console.log('Server running '))
