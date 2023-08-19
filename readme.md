# Something new

1. Cursor follower

```
#circle-cursor {
	height: 13px;
	width: 13px;
	background-color: white;
	position: absolute;
	border-radius: 50%;
	z-index: 9999;
	transform: translate(-50%, -50%);
	transition: transform 0.3s ease-out;
}
```

````
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
````

dets.clientX
dets.clientY
elem.getBoundingClientRect()
gsap.utils.clamp(min,max,varname)

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
