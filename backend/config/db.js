const mongoose = require('mongoose');
var alphanumeric = require('alphanumeric-id');
const uri = `mongodb+srv://mohsin00786:mohsin00786@cluster0.9pujbap.mongodb.net/mmGarments?retryWrites=true&w=majority&appName=Cluster0`
// const uri = "mongodb+srv://mohsin00786:mohsin00786@cluster0.9pujbap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const uri = `mongodb+srv://mohsin00786:mohsin00786@cluster0.9pujbap.mongodb.net/foodDelivery?retryWrites=true&w=majority&appName=Cluster0`
let key=  alphanumeric(20)
//   {
//     id:key,
//     name:'Towel',
//     price:970,
//     quantity:150,
//     description:'Towel description',
//     sizes:['Face towel','Hand towel','Bath towel'],
//     type:'towel'
// },
// {
// // id:Math.trunc(Math.random()*1000),
// id:key,
// name:'T-Shirts',
// price:970,
// quantity:150,
// description:'T-Shirts description',
// sizes:['small','medium','large','x-large'],
// type:'tshirts'
// },
let data={
    id:key,
    name:'Bedsheet',
    price:4350,
    quantity:22,
    description:'Bedsheet description',
    sizes:['Twin','Queen','king'],
    type:'bedsheet'
}

const mongoDB = async () => {
    let myData=[{}]
    mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then((client) => {
        console.log('Database Connected')
        // const textileCollection = mongoose.model('textileCollection', dataSchema);
        // const kitty = new textileCollection(data);
        // console.log('data',textileCollection.find({}))
        // kitty.save().then(() => console.log('frfr'));
  
    }).catch((err) => {
        console.log('Err===>', err)
    });
}

module.exports = mongoDB
