
grid.addEventListener("scroll",(e)=>{
   let currDistanceFromTop=e.currentTarget.scrollTop;
   let currDistanceFromLeft=e.currentTarget.scrollLeft;

   columnTags.style.transform=`translateX(-${currDistanceFromLeft}px)`;
   rowNumbers.style.transform=`translateY(-${currDistanceFromTop}px)`;
}); 