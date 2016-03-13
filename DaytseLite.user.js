// ==UserScript==
// @name        DaytseLite
// @namespace   Sanki
// @description Block trash on daytse
// @include     http://dayt.se/*
// @version     1
// @grant       none
// @noframes
// ==/UserScript==

window.onload = function(){
  if($('iframe')){
   $('iframe').each(function(){
     if($(this).attr('src') != undefined){
       if($(this).attr('src').match(/http\:\/\/dayt\.se/g) == null){
         $(this).remove();
       }
       else {
         if($(this).attr('src').match(/http\:\/\/dayt\.se\/topbanner/g)){
           $(this).remove();
         }
       }
     }
   });
  }
  if($('#downsec')){ $('#downsec').remove(); }

  $('.header').children().each(function(ind){
   if($(this).attr('id') != 'header'){
     $(this).remove();
   };
  });

};
