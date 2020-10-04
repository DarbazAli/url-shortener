const redirectRoute = (app, URL) => {
    app.route('/:url').get((req, res) => {
        const url = req.params.url

        // search in db for this url
        URL.findOne({ short_url: url }, (err, data) => {
            if (err) console.log(err)
            res.redirect(data.original_url)
        })
    })
}

export default redirectRoute
