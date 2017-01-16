  $(function(){
         //幻灯片
         $('.slide-banner').flexslider({
              namespace: "flex-",             
              animation: "fade",            
              direction: "vertical",        
              reverse: false,                 
              animationLoop: true,           
              smoothHeight: false,            
              startAt: 0,                     
              slideshow: true,                
              slideshowSpeed: 2000,           
              animationSpeed: 1000,            
              initDelay: 0,                   
              pauseOnAction: false,           
              pauseOnHover: true,            
              directionNav: true,             
              controlNav: true,               
              prevText: "",                   
              nextText: "",                   
              keyboard: true,                 
              mousewheel: false,              
              pausePlay: false,               
              pauseText: "Pause",             
              playText: "Play"              
          });
  


    })