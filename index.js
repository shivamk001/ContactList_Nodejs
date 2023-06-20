const exp = require('constants')
const express=require('express')
const path=require('path')
const app=express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded());
app.use(express.static('assets'))

//MW!
app.use((req, res, next)=>{
    req.myName='Shivam'
    console.log('MW1', req.url)
    next()
})
// //MW2
// app.use((req, res, next)=>{
//     console.log('MW2', req.myName)
//     next()
// })

var contactList=[
    {
        name: 'ABC', phone: '1234567890'
    },
    {
        name: 'DEF', phone: '2345678901'
    },
    {
        name: 'GHI', phone: '3456789012'
    }
]

app.get('/', function(req, res){
    return res.render('home', {
        title: 'Contact List',
        contact_list: contactList
    })
})


app.post('/create_contact', function(req, res){
    console.log(req.body)
    contactList.push(req.body)
    return res.redirect('back')
})

app.get('/delete_contact/', function(req, res){
    console.log(req.query)
    let phone=req.query.phone;
    let contactIndex=contactList.findIndex(contact=>contact.phone==phone);

    if(contactIndex!=-1){
        contactList.splice(contactIndex, 1);
    }
    console.log(`ContactList: ${contactList}`)
    return res.redirect('back');
})



const port=8000
app.listen(port, function(err){
    console.log(`Server is up and running on ${port}`)
})