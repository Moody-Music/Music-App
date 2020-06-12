const axios = require('axios')
const jsonMoods = require('../data/mood.json')
const randomizer = require('../helpers/randomize')

class GiphyController{
    static baseUrl = 'http://api.giphy.com/v1/gifs/search'

    static async getByMood(req, res, next){
        const currentMood = req.params.mood
        if(!jsonMoods[currentMood]){
            res.status(404).json({
                message: "Mood not available"
            })
        }
        try{
            const listGIF = await axios({
                method: 'GET',
                url: `${GiphyController.baseUrl}`,
                params: {
                    api_key: process.env.GIPHY_KEY,
                    q: currentMood
                }
            })
            const random = randomizer(listGIF.data.data, 10)
            console.log(random)
            const gifs = random.map(gif => {
                const newFormat = {
                    id: gif.id,
                    embed_url: gif.embed_url
                }
                return newFormat
            })

            res.status(200).json( { gifs })
        }catch(err){
            console.log(err)
            next(err)
        }
    }
}

module.exports = GiphyController