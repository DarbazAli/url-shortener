import { generate } from 'shortid'
import { isUri } from 'valid-url'

const apiURL = (app, URL) => {
    app.route('/api/url')
        .post((req, res) => {
            const { url } = req.body
            if (!isUri(url)) {
                res.status(401).send('This is not avalid url')
            } else {
                const newURL = new URL({
                    short_url: generate(),
                    original_url: url,
                })

                newURL
                    .save()
                    .then((data) => {
                        const host = req.headers.host
                        res.render('index', {
                            original_url: data.original_url,
                            short_url: host + '/' + data.short_url,
                        })
                    })
                    .catch((err) => res.send(err))
            }
        })
        .get((req, res) => {
            res.send('urls')
        })
}

export default apiURL
