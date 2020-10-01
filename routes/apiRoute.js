import { generate } from 'shortid'

const apiURL = (app, URL) => {
    app.route('/api/url')
        .post((req, res) => {
            const { url } = req.body
            const newURL = new URL({
                short_url: generate(),
                original_url: url,
            })

            newURL
                .save()
                .then((data) => res.json(data))
                .catch((err) => res.send(err))
        })
        .get((req, res) => {
            res.send('urls')
        })
}

export default apiURL
