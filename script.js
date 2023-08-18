var timeout;

function loco() {
   gsap.registerPlugin(ScrollTrigger);

   // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

   const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
   });
   // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
   locoScroll.on("scroll", ScrollTrigger.update);

   // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
   ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
   });




   // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
   ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

   // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
   ScrollTrigger.refresh();


}

function firstPageAnim() {
   var tl = gsap.timeline();

   tl.to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      stagger: .2

   })
      .from('#home-btm', {
         opacity: 0,
         ease: Expo.easeInOut,
         duration: 1.5,
         delay: -1.3,

      });

}

function skewcircle() {
   var xscale = 1;
   var yscale = 1;

   var xPrev = 0;
   var yPrev = 0;

   window.addEventListener('mousemove', function (dets) {
      clearTimeout(timeout);

      var xDiff = dets.clientX - xPrev;// currentVal - prevVal
      var yDiff = dets.clientY - yPrev;

      xscale = gsap.utils.clamp(0.8, 1.2, xDiff);
      yscale = gsap.utils.clamp(0.8, 1.2, yDiff);

      yPrev = dets.clientY;
      xPrev = dets.clientX;// updating the values

      circleCursor(xscale, yscale);

      timeout = setTimeout(function () {
         document.querySelector('#circle-cursor').style.transform = `translate(${dets.clientX - 6}px,${dets.clientY - 5}px) scale(1,1)`;


      }, 100);

   });


}

function circleCursor(xscale, yscale) {
   window.addEventListener("mousemove", function (dets) {
      let mouse = document.querySelector('#circle-cursor');
      mouse.style.transform = `translate(${dets.clientX - 6}px,${dets.clientY - 5}px) scale(${xscale},${yscale})`;

   });

}

function mouseImg() {
   let elems = document.querySelectorAll('.box');
   elems.forEach(function (value) {
      value.addEventListener('mousemove', function (dets) {
         var prev = 0;

         var diffx = dets.clientX - prev;
         prev = dets.clientX;


         var diff = dets.clientY - value.getBoundingClientRect().top;

         gsap.to(value.querySelector('img'), {
            opacity: 1,
            ease: Power1,
            top: diff,
            left: dets.clientX,
            rotate: diffx/50,
         });
      });

   });


}
mouseImg();

loco();
firstPageAnim();
skewcircle();
circleCursor();








