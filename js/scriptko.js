// cats data
var catsData = [
    {
        clickCount : 0,
        name : 'Tabby',
        imgSrc : 'https://farm6.staticflickr.com/5598/14934282524_344c84246b.jpg',
    },
    {
        clickCount : 0,
        name : 'Tiger',
        imgSrc : 'https://farm9.staticflickr.com/8018/7380380362_0589be0be1.jpg',
    },
    {
        clickCount : 0,
        name : 'Scaredy',
        imgSrc : 'https://farm6.staticflickr.com/5224/5675069067_c427114ce0.jpg',
    },
    {
        clickCount : 0,
        name : 'Shadow',
        imgSrc : 'https://farm7.staticflickr.com/6100/6303228181_59371c29dc.jpg',
    },
    {
        clickCount : 0,
        name : 'Sleepy',
        imgSrc : 'https://farm3.staticflickr.com/2234/1704658865_3b982b56cf.jpg',
    }
];

// Knockput JS ViewModel
var AppViewModel = function (data, something) {
    var self = this;

    for(var i =0, len = cats.length; i < len; i++) {

    }

};

// bind the AppViewModel() to Knockout
ko.applyBindings(new AppViewModel());

