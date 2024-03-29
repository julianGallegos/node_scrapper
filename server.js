var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    
    //this is where you decide which movie from imdb you want to scrape
    //we will get the title, release date and rating from the url
    url = 'http://www.imdb.com/title/tt1375666/?ref_=nv_sr_1';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            $('.header').filter(function(){
                var data = $(this);
                title = data.children().first().text();            
                release = data.children().last().children().text();

                json.title = title;
                json.release = release;
            })

            $('.star-box-giga-star').filter(function(){
                var data = $(this);
                rating = data.text();

                json.rating = rating;
            })
        }
       
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

            console.log('File successfully written! - Check your project directory for the output.json file');

        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;



