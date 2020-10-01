import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
    short_url: String,
    original_url: String,
})

const URL = mongoose.model('URL', urlSchema)

export default URL
