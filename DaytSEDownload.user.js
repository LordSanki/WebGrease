// ==UserScript==
// @name        DaytSEDownload by Sanki
// @namespace   http://dayt.se/
// @description Creates a download button on datse webpage
// @include     http://dayt.se/forum/showthread.php*
// @version     1
// @grant       none
// @noframes
// ==/UserScript==

function DaytSEDownload(){ 
   $('iframe').each( function(index){
     var src = $(this).attr('src'); 
     if( src.match(/dayt\.se\/pasmov/g) || src.match(/dayt\.se\/pasep/g)){
        var link = $(this).contents().find('#ggplayer').contents().find('iframe').attr('src');
        link = link.replace("file\/d\/", "uc\?id=");
        link = link.replace("\/preview", "&export=download");
        window.open(link, "_newtab");
     }
   });
}

window.onload = function(){
    $('#forumheadercontent > #navbar > font').append("<button onclick='DaytSEDownload()'>Download</button>");
   var script = document.createElement('script');
   script.appendChild(document.createTextNode( DaytSEDownload ));
   (document.body || document.head || document.documentElement).appendChild(script);
}

