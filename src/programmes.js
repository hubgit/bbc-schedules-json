const resource = require('fetch-resource')
const cheerio = require('cheerio')

const seasonPosition = seasonTitle => {
    if (!seasonTitle) return ''

    const matches = seasonTitle.match(/Series (\d+)/)

    return matches ? matches[1] : ''
}

const resourcePid = node => {
    if (!node.attr('resource')) return ''

    const matches = node.attr('resource').match(/http:\/\/www\.bbc\.co\.uk\/programmes\/(.+)/)

    return matches ? matches[1] : ''
}

const imagePid = imageUrl => {
    const matches = imageUrl.match(/https:\/\/ichef\.bbci\.co\.uk\/images\/ic\/480x270\/(.+?)\.jpg/)

    return matches ? matches[1] : ''
}

const extract = html => {
    const $ = cheerio.load(html)
    
    return $('[typeof="BroadcastEvent"]').map(function () {
        const series = $('[typeof="TVSeries"]', this)
        const seriesTitle = $('[typeof="TVSeries"] > [property="name"]', this).text()

        const season = $('[typeof="TVSeason"]', this)
        const seasonTitle = $('[typeof="TVSeason"] > [property="name"]', this).text()

        return {
            start: $('[property="startDate"]', this).attr('content'),
            end: $('[property="endDate"]', this).attr('content'),
            repeat: Boolean($('.repeat', this).length),
            title: $('.programme__title', this).text(),
            subtitle: $('.programme__subtitle', this).text(),
            episode: {
                pid: $('[typeof="TVEpisode"]', this).attr('data-pid'),
                title: $('.programme__subtitle > [property="name"]', this).text(),
                position: $('[property="position"]', this).text(),
                total: $('.programme__groupsize', this).text(),
                description: $('[property="description"]', this).text(),
                image: imagePid($('meta[property="image"][content]', this).attr('content')),
            },
            season: {
                pid: resourcePid(season),
                title: seasonTitle,
                position: seasonPosition(seasonTitle),
            },
            series: {
                pid: resourcePid(series),
                title: seriesTitle,
            },     
        }
    }).toArray()
}

const fetch = options => {
    const url = `https://www.bbc.co.uk/${options.channel}/programmes/schedules/${options.year}/${options.month}/${options.day}`
    
    return resource(url).fetch('html')
}

module.exports = { extract, fetch }