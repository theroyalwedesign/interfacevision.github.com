function gallery() {
  var current = ($('ul.slideshow li.show')?  $('ul.slideshow li.show') : $('#ul.slideshow li:first')); //if no IMGs have the show class, grab the first image
  var next = ((current.next().length) ? ((current.next().attr('id') == 'slideshow-caption')? $('ul.slideshow li:first') :current.next()) : $('ul.slideshow li:first')); //Get next image, if it reached the end of the slideshow, rotate it back to the first image
  var title = next.find('img').attr('title'); //Get next image caption
  var desc = next.find('img').attr('alt');  
  next.css({opacity: 0.0}).addClass('show').animate({opacity: 1.0}, 1000); //Set the fade in effect for the next image, show class has higher z-index
  $('#slideshow-caption').animate({bottom:-70}, 300, function () { //Hide the caption first, and then set and display the caption
      $('#slideshow-caption h3').html(title); //Display the content
      $('#slideshow-caption p').html(desc);       
      $('#slideshow-caption').animate({bottom:0}, 500); 
  });   
  current.animate({opacity: 0.0}, 1000).removeClass('show'); //Hide the current image
}

function slideShow(speed) {
  $('ul.slideshow').append('<li id="slideshow-caption" class="caption"><div class="slideshow-caption-container"><h3></h3><p></p></div></li>'); //append a LI item to the UL list for displaying caption
  $('ul.slideshow li').css({opacity: 0.0}); //Set the opacity of all images to 0
  $('ul.slideshow li:first').css({opacity: 1.0}); //Get the first image and display it (set it to full opacity)
  $('#slideshow-caption h3').html($('ul.slideshow').find('img').attr('title')); //Get the caption of the first image from REL attribute and display it
  $('#slideshow-caption p').html($('ul.slideshow').find('img').attr('alt'));
  $('#slideshow-caption').css({opacity: 0.7, bottom:0}); //Display the caption
  var timer = setInterval('gallery()',speed); //Call the gallery function to run the slideshow  
}
