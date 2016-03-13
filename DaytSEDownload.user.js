// ==UserScript==
// @name        DaytSEDownload | Sanki
// @namespace   http://dayt.se/
// @description Creates a download button on datse webpage
// @include     http://dayt.se/forum/showthread.php*
// @version     2
// @grant       none
// @noframes
// @encoding utf-8
// @license https://creativecommons.org/licenses/by-sa/4.0/
// @updateURL https://github.com/LordSanki/WebGrease/raw/master/DaytSEDownload.user.js
// @downloadURL https://github.com/LordSanki/WebGrease/raw/master/DaytSEDownload.user.js
// @homepage https://github.com/LordSanki/WebGrease
// ==/UserScript==

/*=======================================================
  Script
======================================================*/

function DaytSEDownload(){
   var link = undefined;
   // take an educated guess to finding link
   $('iframe').each( function(index){
     var src = $(this).attr('src');
     if( src.match(/dayt\.se\/pasmov/g) || src.match(/dayt\.se\/pasep/g)){
       var l1frame = $(this).contents();
       var l2frame = $(l1frame).find('#ggplayer');
       link = $(l2frame).contents().find('iframe').attr('src');
     }
   });
  if(link == undefined){
    console.log("Brutefoce");
    RecursiveSearchForLink('body',1);
  }
  else{
    DownloadWithLink(link);
  }
}

function DownloadWithLink(link){
   link = link.replace("file\/d\/", "uc\?id=");
   link = link.replace("\/preview", "&export=download");
   console.log(link);
   window.open(link, "_newtab");
}

function RecursiveSearchForLink(elem, lvl){
  $(elem).find('iframe').each( function(index){
    console.log("LVL "+lvl+">");
    console.log(":::\t" + $(this).attr('src'));
    if($(this).attr('src') == undefined) {return;}
    if($(this).attr('src').match(/docs\.google\.com\/file/g)){
      DownloadWithLink($(this).attr('src'));
      console.log("Found");
      return;
    }
    // reject cross domain iframes
    if(!$(this).attr('src').match(/http\:\/\/dayt\.se/g)){return;}
    // reject iframes with no child iframes
    if($(this).contents().find('iframe')[0] == undefined){return;}
    var t = RecursiveSearchForLink($(this).contents(), lvl+1);
  });
}

window.onload = function(){
    $('#forumheadercontent > #navbar > font').append("<button onclick='DaytSEDownload()'>Download</button>");
   var script = document.createElement('script');
   script.appendChild(document.createTextNode( DaytSEDownload ));
   script.appendChild(document.createTextNode( RecursiveSearchForLink ));
   script.appendChild(document.createTextNode( DownloadWithLink ));
   (document.body || document.head || document.documentElement).appendChild(script);
}

