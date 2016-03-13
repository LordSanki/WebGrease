// ==UserScript==
// @name        DaytseLite
// @namespace   https://github.com/LordSanki/WebGrease/
// @description Block trash on daytse
// @include     http://dayt.se/*
// @version     1.1
// @grant       none
// @noframes
// @license https://creativecommons.org/licenses/by-sa/4.0/
// @updateURL https://github.com/LordSanki/WebGrease/raw/master/DaytseLite.user.js
// @downloadURL https://github.com/LordSanki/WebGrease/raw/master/DaytseLite.user.js
// @homepage https://github.com/LordSanki/WebGrease
// @run-at document-start
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
