// ==UserScript==
// @name         ImgSkraper
// @namespace    https://github.com/totocheku/ImgSkraper/
// @version      0.1
// @description  Scrap all the <img> on the web page and show them in side bar for easy viewing
// @author       totocheku
// @match        http://www.xossip.com/*
// @grant        none
// ==/UserScript==

var imgScraperStyle = 
    '.imgScraper_sidebar.left {position:fixed;height: 100%;width: 200px;}' + 
    '.imgScraper_container { height: 100%; width:100%; }';

function loadResources() {
    //jquery UI
    $("head").append(
        '<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css">'
        + '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.js"></script>'
    );
   
    //jquery sidebar
    $("head").append(
        '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sidebar/3.3.0/jquery.sidebar.js"></script>'
    );
    
    //css 
    $('head').append(
        '<style>'+imgScraperStyle+'</style>'
    );
}

function start() {
    var sidebarId = 'imgScraper_sidebar';
    //create side bar which shall be listing all of images
    var sidebar = $('<div>', {
        'id':sidebarId,
        text: "what is this \n something is better than nothing ",
        'class': 'imgScraper_sidebar left'
    });
        
    $('img').each(function(index) {
        $(this).load(function() {
            var width = $(this).width();
            var height = $(this).height();
            if(width > 100 && height > 100) {
                console.log(index + '(' + width + 'x' + height + ') : ' + $(this).attr('src'));
            }
        });
    });
    
    sidebar.sidebar({'close':true, 'isClosed':true});
    
    sidebar.on("sidebar:open", function() {
        alert('sidebar opened');
    });
    
    sidebar.on("sidebar:close", function() {
        alert('sidebar closed');
    });
    
    var wholeBody = $('body').html();
    try {
        //put the whole webside inside a div
        $('body').replaceWith('<div class="imgScraper_container">'+sidebar.prop('outerHTML')+'<div>'+wholeBody+'</div></div>');
    } catch(err) {
        //console.log(err);
    }
    
    //sidebar.trigger("sidebar:open");
}

function begin() {
    //sidebar loaded?
    if(typeof $.fn.sidebar != 'undefined') {
        start();
        
        return;
    }
    
    setTimeout(begin, 1000);
}

function checkjQuery() {
    if(typeof jQuery != 'undefined') {
        loadResources();
        
        begin();
        
        return;
    }
    
    setTimeout(checkjQuery, 1000);
}

if(!window.jQuery) {
    //load jQuery
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.js';
    
    (document.getElementsByTagName('head') || document.getElementsByTagName('body'))[0].appendChild(script);
    
    //check if jQuery has been loaded
    setTimeout(checkjQuery, 1000);
}