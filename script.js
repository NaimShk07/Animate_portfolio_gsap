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
loco();

// function circleCursor(){
//    window.addEventListener("mousemove",function (dets) {
//       document.querySelector('#circle-cursor').style.transform=`translate(${dets.clientX}px,${dets.clientY}px)`
//      
//    })

// }
// circleCursor()

function circleCursor() {
   const follower = document.querySelector('#circle-cursor');
   let mouseX = 0, mouseY = 0;

   document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
   });

   const updateFollowerPosition = () => follower.style.transform = `translate(${mouseX - follower.clientWidth / 2}px, ${mouseY - follower.clientHeight / 2}px)`;

   const animate = () => (updateFollowerPosition(), requestAnimationFrame(animate));

   animate();

}
circleCursor();


function firstPageAnim() {
   var tl = gsap.timeline();

   tl.to(".boundingelem", {
         y: 0,
         ease: Expo.easeInOut,
         duration: 2,   
         stagger: .2

      });

}
firstPageAnim()







