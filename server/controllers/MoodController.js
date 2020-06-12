const listMood = require('../data/mood.json')

class MoodController{
    static getAll(req, res, next){
        try{
            res.status(200).json({
                moods: Object.keys(listMood)}
                )
        }catch(err){
            next(err)
        }
    }
}

module.exports = MoodController