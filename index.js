const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));




app.get('/', function(req, res) {
    // console.log(__dirname);
    // res.send('<h1>cool, it is running or is it?</h1>');
    //return

    // console.log("from the get route", req.myName);

    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log('Error in fetching contact list from db');
            return;
        }

        return res.render('home', {
            title: "My contacts list",
            contact_list: contacts
        });

    });



});

app.get('/practice', function(req, res) {
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

app.get('/delete-contact', function(req, res) {
    //console.log(req.query);
    //let phone = req.query.phone;
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log('error in deleting a object form database');
            return;
        }

        return res.redirect('back');
    });
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }

    // return res.redirect('back');
});

app.get('/', function(req, res) {

});


app.post('/create_contact', function(req, res) {

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if (err) {
            console.log('error in creating a contact!');
            return;
        }

        console.log('*********', newContact);
        return res.redirect('back');

    });

    // return res.redirect('/');
    // return res.redirect('back');
});

app.listen(port, function(err) {

    if (err) {
        console.log('Error in running Server');
    }

    console.log('Yup. My express server is running on port', port);
});
