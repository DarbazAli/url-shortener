import { Schema, model } from 'mongoose'

const urlSchema = new Schema({
    short_url: String,
    original_url: String,
})

const URL = model('URL', urlSchema)

export default URL
