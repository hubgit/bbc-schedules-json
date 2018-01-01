const express = require('express')
const app = express()
const programmes = require('./programmes')

app.set('json spaces', 2)

app.use('/:channel/:year/:month/:day', async (req, res, next) => {
    try {
        const html = await programmes.fetch(req.params)

        const data = programmes.extract(html)

        res.json(data)
    } catch (e) {
        res.json({ 
            error: 'There was an error fetching the schedule data.' 
        })
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})