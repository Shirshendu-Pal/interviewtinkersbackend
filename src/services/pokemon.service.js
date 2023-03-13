const axios = require("axios")
const { User,Token, Pokemon } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
// 

const addPokemon = async (reqFile, reqBody) =>{

    const data = await Pokemon.create({
        ...reqBody,
        image: reqFile?reqFile.path:null
    })

    await User.findByIdAndUpdate(reqBody.userId,{
        $push:{
           pokemons:  data._id
        }
    })

}

const addMultiplePokemons = async (mainBody,reqBody) =>{
    // console.log()
//    let response =  axios.get("https://api.pokemontcg.io/v2/cards?page=1&pageSize=10")
//    res.json(data)

let user = await User.findById(mainBody.userId)

for(let data of reqBody.data.data ){
    let tempAttacks = []
    let tempABilities = []
    // console.log(data.abilities)
    if(data.attacks){
    data.attacks.map((atk) =>{
        tempAttacks.push(atk.name)
    })
}
if(data.abilities){
    data.abilities.map((atk) =>{
        tempABilities.push(atk.name)
    })
}
   
    let pokemon = await Pokemon.create({
        name: data.name,
        attacks: tempAttacks,
        abilities: tempABilities,
        image: data.images.large
    })
    user.pokemons.push(pokemon._id)

    
}
await user.save()
    return user
}

const getPokemons = async (reqQuery) =>{
    let pageSize = parseInt(reqQuery.pageSize), pageNumber = parseInt(reqQuery.page)

    let pokemons =
     await Pokemon.find({})
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize);
    let count =
     await Pokemon.find({})
    .countDocuments()

    let totalPage = count % pageSize === 0 ? count / pageSize : Math.floor(count / pageSize) + 1;
    console.log(totalPage)
    return {pokemons, totalPage, totalDocumentCount:count }
}


const addHp = async () =>{
    let pokemons = await Pokemon.find()
    let hp = 70
    pokemons.map(async ( pokemon) =>{
        hp++;
        await pokemon.updateOne({
            hp:hp
        })
    })
}
module.exports ={
    addPokemon,
    addMultiplePokemons,
    getPokemons,
    addHp
}