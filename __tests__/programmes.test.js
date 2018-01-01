const fs = require('fs')
const programmes = require('../src/programmes')

// test('fetches HTML', async () => {
//     const options = {
//         channel: 'bbcone',
//         year: '2008',
//         month: '07',
//         day: '21'
//     }

//     const html = await programmes.fetch(options)
//     const events = programmes.extract(html)
//     expect(events.length).toBe(37) 
// })

test('extracts data from HTML', async () => {
    const html = fs.readFileSync(__dirname + '/data/example.html')
    
    const events = programmes.extract(html)

    expect(events.length).toBe(37) 

    expect(events[0]).toEqual({
        title: 'Breakfast',
        subtitle: '21/07/2008',
        episode: {
            pid: 'b00cnx9p',
            title: '21/07/2008',
            position: '',
            total: '',
            description: 'The latest news, sport, business and weather from the BBC\'s Breakfast team.',
            image: 'p01vlgx0',
        },
        season: {
            pid: '',
            title: '',
            position: ''
        },
        series: {
            pid: 'b006v5tb',
            title: 'Breakfast',
        },
        start: '2008-07-21T06:00:00+01:00',
        end: '2008-07-21T09:15:00+01:00',
        repeat: false
    })

    expect(events[1]).toEqual({
        title: 'Heir Hunters',
        subtitle: 'Series 2, Viney',
        episode: {
            pid: 'b00cr10x',
            title: 'Viney',
            position: '16',
            total: '21',
            description: 'The story of a homeless man who left behind thousands of pounds but no will.',
            image: 'p02dht12',
        },
        season: {
            pid: 'b00cg66y',
            title: 'Series 2',
            position: '2'
        },
        series: {
            pid: 'b007nms5',
            title: 'Heir Hunters',
        },
        start: '2008-07-21T09:15:00+01:00',
        end: '2008-07-21T10:00:00+01:00',
        repeat: false
    })

    expect(events[2]).toEqual({
        title: 'Escape to the Country',
        subtitle: 'Series 6, Middlesex to Leicestershire',
        episode: {
            pid: 'b008fgk3',
            title: 'Middlesex to Leicestershire',
            position: '',
            total: '',
            description: 'Jules Hudson helps a couple from Middlesex house-hunt for the perfect family home.',
            image: 'p04qmb0x',
        },
        season: {
            pid: 'b0071stm',
            title: 'Series 6',
            position: '6'
        },
        series: {
            pid: 'b006vb2f',
            title: 'Escape to the Country',
        },
        start: '2008-07-21T10:00:00+01:00',
        end: '2008-07-21T11:00:00+01:00',
        repeat: true
    })
})