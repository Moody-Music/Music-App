const axios = require('axios')
const jsonMoods = require('../data/mood.json')

class SongController{
    static baseUrl = 'http://api.deezer.com'
    static sourceLyrics = 'https://api.lyrics.ovh/v1'
    static listMood = jsonMoods
    static randomSong(songs, count) {
        let listSong = []
        while(listSong.length < count){
            let random = Math.floor(Math.random()*songs.length)
            if(songs[random].readable){
                listSong.push(songs.splice(random,1)[0])
            }
        }
        return listSong
    }
    static getLyrics(artist, title){
        return new Promise((resolve, reject) => {
            axios.get(`${SongController.sourceLyrics}/${artist.toLowerCase()}/${title.toLowerCase()}`)
              .then(({data}) => {
                  resolve(data.lyrics)
              })
              .catch(err => {
                  resolve('Cannot find lyrics of this song')
              })
        })
    }
    static async songByMood (req, res, next) {
        if(!SongController.listMood[req.params.mood]){
            res.status(404).json({
                message: "Mood not available"
            })
        }
        const requestUrl = `${SongController.baseUrl}/playlist/${SongController.listMood[req.params.mood]}`
        try{
            const response = await axios.get(requestUrl)
            const random = SongController.randomSong(response.data.tracks.data, 5)
            const songs = await Promise.all(
                random.map(async (song) => {
                    const lyrics = await SongController.getLyrics(song.artist.name, song.title)
                    let formatSong = {
                        id: song.id,
                        artist: song.artist.name,
                        title: song.title,
                        preview: song.preview,
                        lyrics
                    }
                    return formatSong
                })
            )
            res.status(200).json( { songs } )
        }catch(err){
            next(err)
        }
    }
}

module.exports = SongController