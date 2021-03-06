var currURL = window.location.href; 
var length = currURL.length; 
var winWidth = $(window).width();
$('.containerMain').css({"width" : winWidth}); 
var allUrl = "https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157645079323413&+description+&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
var jsUrl = "https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157691750682445&+description+&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
var visualUrl = "https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157690113942221&+description+&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
var toggle = 0; 
var targetLink = ''; 

function flickrAPI(url, id, type){
    //create a var that makes a call to the flickr API  
    if (type === 'design'){
        targetLink = '_self';
    }

    if (type === 'develop'){
        targetLink = '_blank';
    }

    var div = "." + id; 
    var getIMG = url;//pass the getIMG var through the getJSON function
    $.getJSON(getIMG, function(data){
        //Loop through each of the photos
        $.each(data.photoset.photo, function(index, photo){ 
        //Create a variable that creates an img src tag for each photo returned
        var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "c.jpg";
        //Create a variable that creates an href tag for each photo returned
        var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id + "/";  
        var folio = $("<div></div>", {"class": "folioDiv20"}).appendTo(div);
        //Create a container for the image and then append to folio
        var img_box = $("<div></div>", {"class": "folioImage20"}).appendTo(folio);
        //Create an image tag and append to each img_box
        $("<img/>").attr("src", img_src).appendTo(img_box); 
            //Create a variable that looks up each individual photo and stores the description from each photo 
            var getPhotoInfo = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.getInfo&photo_id=" + photo.id + "&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
            //Create a function that parses the info
            $.getJSON(getPhotoInfo, function(data){
                //Loop through the info and sort through key-value pairs
                $.each(data.photo.title, function(key, title){
                    //create a div that stores each title for each photo
                    $("<div/>", {"class": "folioTitle", "text": title }).appendTo(folio);
                     //Create a horizontal orange line
                    $("<hr></hr>", {"background": "black", "border": "0", "height": "5px", "width": "90%"}).appendTo(folio);
                }); 

                $.each(data.photo.description, function(key, desc){
                    //create a variable that stores each description for each photo
                    $("<div></div>", {"class": "folioDescription20", "text": desc, "width": "90%"}).appendTo(folio);
                });

                $.each(data.photo.tags.tag, function(index, object){
                    //Create a variable that stores each of the tags
                    var tagString = object.raw; 
                    
                    var regex = /www/i;  
                    var regexGit = /git/i;
                    var testregex = regex.test(tagString);
                    var testGit = regexGit.test(tagString);

                    var a_href = 'http://' + tagString; 

                    if (tagString === 'www.tvapocalypse.herokuapp.com'){
                        a_href = 'http://' + 'tvapocalypse.herokuapp.com';
                    }

                    if (tagString === 'www.toshiblog.herokuapp.com'){
                        a_href = 'http://' + 'toshiblog.herokuapp.com';
                    }

                    if (tagString === 'www.lsfilm.herokuapp.com'){
                        a_href = 'http://' + 'lsfilm.herokuapp.com';
                    }

                    if (tagString === 'www.onagusfolio.herokuapp.com/projects/leechesposter'){
                        a_href = 'http://' + 'onagusfolio.herokuapp.com/projects/leechesposter';
                    }

                    if (testregex == true) { 
                         
                        //Create a JQuery div whose class is folioTag 
                        var folioFooter = $("<div></div>", {"class": "folioTag"}).appendTo(folio);
                        //Create a variable called valueLink that creates an href incorporating tagString
                        $('<a/>', {
                            href : a_href,
                            text : "Open",
                            target : targetLink
                        }).appendTo(folioFooter);
                        //Wrap valueLink with class tagWhite
                        //Append to folio
                    } 

                    if (testGit == true) {

                        var folioFooter2 = $("<div></div>" , {class: photo.farm, id : "ff2"}).appendTo(folio);

                        var folioGit = $('<a/>', {
                            class : 'fab fa-github fa-2x',
                            href : a_href,  
                            target : targetLink
                        }).appendTo(folioFooter2);  

                        //$(folioGit).html('<i class="fab fa-github fa-stack-1x"></i>').appendTo(folioGit);
                        
                    }

                 });

            });

               
        });

    });//end

}  

function socialMediaList() { 
        var socialLinks = {
            youtube : "http://www.youtube.com/channel/UC3OP9LlHNujCfuX6DAV_uXA",
            github : "http://github.com/onagus",
            flickr : "http://www.flickr.com/photos/68642514@N06/"
        }; 
        $.each(socialLinks, function(key, value){
            var a_href = ' <a href="' + value + '" target="_blank">';
            var icons  = '<img class="iconImg"  src="images/' + key + '.gif"/>';
            var social = $("<div></div>", {"id": "socialContainer"}).appendTo("#social");
            $(icons).appendTo(social).wrap(a_href);
            console.log(icons); 
        });
}  

function checkVerticalOffset() {
	var mediaQuery = window.matchMedia( "(min-width: 640px)" );
	if (mediaQuery.matches) {
		return -70; 
	}
	else {
		return -70;
	}
} 

function scrollToElement(selector, time, verticalOffset) {
    var time = typeof(time) != 'undefined' ? time : 600;
    var verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    var element = $(selector);
    var offset = element.offset();
    var offsetTop = offset.top + verticalOffset;
    $('html, body').animate({scrollTop: offsetTop}, time); 
} 

function toggleMoreLess(){
    switch(toggle) {
      case 0:
        $('#moreLink').text("Less");
        toggle++;
        $('#bio').animate({height: '400px'}, "slow").promise().done(function(){
            $(this).animate({height : '100%'});
            $(this).html(
                '<div id="biowrapper">' +
                    '<img id="portrait" src="images/toshi.png">' +
                    '<h2>...currently focusing on UI Design, Front End Development, and React-Redux.</h2>' + 
                '</div>'
            );
        });
        break;
      case 1:
        $('#moreLink').text("More");
        toggle--;
        $('#bio').animate({height: '0px'}, "slow").promise().done(function(){ 
            $(this).empty();
        });
        break; 
    }  
}

$('#contact-button').on('click touchstart',function(e){
    e.preventDefault();
    var contactOBJ = {};
    $(':input').each(function(i, data){
        console.log(data);
        var that = $(this);
        var key = that.attr('name');
        var value = that.val();
        console.log(value);
        contactOBJ[key] = value;
    }); 
    $.ajax({
        type: 'POST',
        url: 'contact.php',
        data: contactOBJ,
        success: function(response){
            alert("Message Delivered");
        },
        error: function(xhr){
            console.log(xhr);
        }
    });
});

function closeNavMenu() {
    $('#navMenu').css("display", "none");
} 

$(document).ready(function() { 

    if (winWidth <= 550) {
        $('#folio_section').empty().html('<i id="navBars" class="fas fa-bars fa-2x"></i>');
        $('#designdevelopdeploy').attr('src', 'images/ddd-small.jpg');  
    }

    if (winWidth > 550 && winWidth <750) {
        $('#designdevelopdeploy').attr('src', 'images/ddd-medium.jpg'); 
    }
      
    if(currURL.slice((length-7), (length)) == 'develop'){
        $('#logoContainer').empty();
        $('#symbolContainer').empty();
        $('#desiconContainer').empty();
        $('#container5').empty();

        setTimeout(function(){ 
            $('#deviconContainer').html('<div class="icon">' +
                                            '<img id="devicon" src="images/devicon.png"/>' +
                                            '<h1 id="devH1">Development Projects</h1>' +
                                            '</div>');    
            $('#container4').html('<div class="folioWrapper">' + 
                                    '<div class="folioCenter"></div>' +           
                                  '</div>').css("height", "100%");
            
            $('#buttonJS').css("pointer-events", "none");
            $('#buttonVisual').css("pointer-events", "auto");
            flickrAPI(jsUrl, 'folioCenter', 'develop');
            window.scrollTo(0, 0);  
        }, 500); 
    }

    if(currURL.slice((length-6), (length)) == 'design'){
        $('#logoContainer').empty(); 
        $('#symbolContainer').empty();
        $('#deviconContainer').empty(); 
        $('#container4').empty();

        setTimeout(function(){   
            $('#desiconContainer').html('<div class="desicon">' +
                                            '<img id="desicon" src="images/desicon.png"/>' +
                                            '<h1 id="desH1">Design Projects</h1>'+
                                            '</div> '
                                            ); 
            $('#container5').html(' <div class="folioWrapper">' + 
                                     '<div class="desfolioCenter"></div>' +          
                                  '</div>').css("height", "100%");
            $('#buttonJS').css("pointer-events", "auto");
            $('#buttonVisual').css("pointer-events", "none");
            flickrAPI(visualUrl, 'desfolioCenter', 'design'); 
            window.scrollTo(0, 0); 
        }, 500); 
    } 

    $('#buttonAll').on('click', function(e){
        e.preventDefault();
        window.location.href = 'http://www.designertoshi.com';
    });

    $('#devH1, #desH1').on('click', function(e){ 
        e.preventDefault();  
    });

    $('#devH1, #desH1').on('mouseover', function(e){ 
        $(this).animate({fontSize: "2.75rem" }, 1000 );
    }); 

    $('#buttonJS').on('click', function(e){
        e.preventDefault();
        window.location.href = 'http://www.designertoshi.com/develop';
    });

    $('#devicon, #devH1').on('click', function(e){
        e.preventDefault();
        //$('#desiconContainer').empty();
        $('#logoContainer').empty();
        $('#symbolContainer').empty();
        $('#deviconContainer').html('<div class="icon">' +
                                        '<img id="devicon" src="images/devicon.png"/>' +
                                        '<h1 id="devH1">Development Projects</h1>' +
                                        '</div>');    
        $('#container4').html('<div class="folioWrapper">' + 
                                '<div class="folioCenter"></div>' +           
                              '</div>').css("height", "100%");
        //$('#container5').empty();
        $('#buttonJS').css("pointer-events", "none");
        $('#buttonVisual').css("pointer-events", "auto");
        flickrAPI(jsUrl, 'folioCenter', 'develop');
        window.scrollTo(0, 0); 
    });

    $('#buttonVisual').on('click', function(e){
        e.preventDefault();   
        $('#logoContainer').empty();
        $('#symbolContainer').empty();
        $('#deviconContainer').empty();
        $('#container4').empty();
        $('#desiconContainer').html('<div class="desicon">' +
                                        '<img id="desicon" src="images/desicon.png"/>' +
                                        '<h1 id="desH1">Design Projects</h1>'+
                                        '</div> '
                                        ); 
        $('#container5').html(' <div class="folioWrapper">' + 
                                 '<div class="desfolioCenter"></div>' +          
                              '</div>').css("height", "100%");
        $('#buttonJS').css("pointer-events", "auto");
        $('#buttonVisual').css("pointer-events", "none");
        flickrAPI(visualUrl, 'desfolioCenter', 'design'); 
        window.scrollTo(0, 0); 
        window.location.href = 'http://www.designertoshi.com/design'; 
    });

    $('#desicon, #desH1').on('click', function(e){
        e.preventDefault();   
        $('#logoContainer').empty();
        $('#symbolContainer').empty();
        var devHeight = document.getElementById('deviconContainer').offsetHeight + document.getElementById('container4').offsetHeight;
        //$('#container4').empty();
        $('#desiconContainer').html('<div class="desicon">' +
                                        '<img id="desicon" src="images/desicon.png"/>' +
                                        '<h1 id="desH1">Design Projects</h1>'+
                                        '</div> '
                                        ); 
        $('#container5').html(' <div class="folioWrapper">' + 
                                 '<div class="desfolioCenter"></div>' +          
                              '</div>').css("height", "100%");
        $('#buttonJS').css("pointer-events", "auto");
        $('#buttonVisual').css("pointer-events", "none");
        flickrAPI(visualUrl, 'desfolioCenter');  
        window.scrollTo(0, devHeight+35); 
    });

    $('#moreLink').on('click', function(e){
        e.preventDefault();  
        toggleMoreLess();
    }); 

    $('#navBars').on('click', function(e){
        e.preventDefault();
        $('#navMenu').css("display", "block");
    });

    $('.buttonReset').on('click', function(e){
        e.preventDefault();
        closeNavMenu();
        window.location.href = 'http://www.designertoshi.com';
    });  

    $('.buttonDesign').on('click', function(e){
        e.preventDefault();
        closeNavMenu();
        window.location.href = 'http://www.designertoshi.com/design';
    });

    $('.buttonDevelop').on('click', function(e){
        e.preventDefault();
        closeNavMenu();
        window.location.href = 'http://www.designertoshi.com/develop';
    });  

    $('#navHeadClose').on('click', function(e){
        e.preventDefault();
        closeNavMenu();
    });

    socialMediaList(); 
    $('#container4').empty();
    $('#container5').empty();
 
});  
