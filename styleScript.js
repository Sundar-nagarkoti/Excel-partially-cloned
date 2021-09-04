let colorspan=document.querySelectorAll(".colors span");
let fontcolortext=colorspan[0];
let backgroundcolorfill=colorspan[1];


let alignspan=document.querySelectorAll(".alignment span");
let leftalign=alignspan[0];
let centeralign=alignspan[1]
let rightalign=alignspan[2];

 fontcolortext.addEventListener("click",(e)=>{
     let colorpicker=document.createElement("input");
     colorpicker.type="color";

     colorpicker.addEventListener("change",(e)=>{
         console.log(e.currentTarget.value);
         oldcell.style.color= e.currentTarget.value;
         let address=oldcell.getAttribute("data-address");
         dataObj[address].color=e.currentTarget.value;
     });

     colorpicker.click();
 })

 backgroundcolorfill.addEventListener("click",(e)=>{
    let colorpicker=document.createElement("input");
    colorpicker.type="color";

    colorpicker.addEventListener("change",(e)=>{
        console.log(e.currentTarget.value);
        oldcell.style.backgroundcolorfill= e.currentTarget.value;
        let address= oldcell.getAttribute("data-address");
        dataObj[address].backgroundColor=e.currentTarget.value;
    });

    colorpicker.click();
})


leftalign.addEventListener("click",(e)=>{
    oldcell.style.textAlign="left";
    let address=oldcell.getAttribute("data-address");
    dataObj[address].textAlign="left";
})
centeralign.addEventListener("click",(e)=>{
    oldcell.style.textAlign="center";
    let address=oldcell.getAttribute("data-address");
    dataObj[address].textAlign="center";
})
rightalign.addEventListener("click",(e)=>{
    oldcell.style.textAlign="right";
    let address=oldcell.getAttribute("data-address");
    dataObj[address].textAlign="right";
})


