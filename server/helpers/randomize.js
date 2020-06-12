const randomizer = (items,count) => {
    let listItem = []
    while(listItem.length < count){
        let random = Math.floor(Math.random()*items.length)
        listItem.push(items.splice(random,1)[0])
    }
    return listItem
}

module.exports = randomizer