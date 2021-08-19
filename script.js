let body=document.querySelector("body");
body.spellcheck=false;

let menuBarDivTag= document.querySelectorAll(".menu-bar div");//file,edit,help
let rowNumbers=document.querySelector(".row-number");//for row
let columnTags=document.querySelector(".column-tags");//for column
let formulaSelectCell=document.querySelector("#select-cell");//for selected cell display
let grid=document.querySelector(".grid");//for selecting cell
let oldcell;//save selected cell
let dataObj={};


for(let i=0;i<menuBarDivTag.length;i++){
  menuBarDivTag[i].addEventListener("click",(e)=>{
      if(e.currentTarget.classList.contains("menu-bar-selected")){
      e.currentTarget.classList.remove("menu-bar-selected");
      }
      else{ 

          for(let j=0;j<menuBarDivTag.length;j++){
            if(menuBarDivTag[j].classList.contains("menu-bar-selected")){
              menuBarDivTag[j].classList.remove("menu-bar-selected");
          }
       
      e.currentTarget.classList.add("menu-bar-selected");
        
    }
      }
    })


}//select file edit help

for(let i=0;i<26;i++){
// let k=0,count=0,j=0;

let div=document.createElement("div");
div.classList.add("column-tag-cell");
div.innerText=String.fromCharCode(65+i);
columnTags.append(div);
}//column

for(let i=1;i<=100;i++){
  let div=document.createElement("div");
  div.classList.add("row-number-cell");
  div.innerText=i;
  rowNumbers.append(div);
}//row

for(let i=1;i<=100;i++){
   
  let row=document.createElement("div");
   row.classList.add("row");

  for(let j=0;j<26;j++){

    // let m=0,count=0,k=0;
    let cell=document.createElement("div");
    cell.classList.add("cell");
    cell.contentEditable=true;
    let address=String.fromCharCode(65+j)+i;
    cell.setAttribute("data-address",address);
    dataObj[address]={value:"",
            formula:"",
            upstream:[],
            downstream:[]
                      };
    row.append(cell);

  }
  grid.append(row);
}//adding grid cell.

grid.addEventListener("click",(e)=>{

  if(!e.target.classList.contains("cell")){
    formulaSelectCell.value="";
    oldcell.classList.remove("grid-selected-cell");//removing oldcell if we click other then cell
    oldcell=undefined;
  }
//  else if(e.target.classList.contains("cell")){
//    let cellAddress= e.target.getAttribute("data-address");
//    formulaSelectCell.value=cellAddress;
    // console.log(oldcell);
// } 
  if(oldcell){
    // console.log(oldcell); //previous selected cell
    oldcell.classList.remove("grid-selected-cell");
  }
  
  if(e.target.classList.contains("cell")){
  e.target.classList.add("grid-selected-cell");
  let cellAddress= e.target.getAttribute("data-address");
  formulaSelectCell.value=cellAddress;
  e.target.addEventListener("input",(e)=>{
    // console.log(e.currentTarget.value);
    let address=e.currentTarget.getAttribute("data-address");
    dataObj[address].value=Number(e.currentTarget.innerText);
    dataObj[address].formula="";
    let currCellUpstream=dataObj[address].upstream;
    for(let i=0;i<currCellUpstream.length;i++){
    removeFromUpstream(address,currCellUpstream[i]);
    } 
    dataObj[address].upstream=[];

    let currCellDownStream=dataObj[address].downstream;
    for(let i=0;i<currCellDownStream.length;i++){//we update the vaule so we are updating it's downstream element value bcz downstream element depened on that cell.
      updateDownstreamElements(currCellDownStream[i]);
      }
  });//for DI(Direct Input) in grid Updateing downstream and upstream 

  oldcell=e.target;

  // console.log(oldcell);
  }

});//selecting cell from grid.

console.log(dataObj);

function removeFromUpstream(dependent, onWhicItIsDepending){
  let newDownStream=[];

  let oldDownStream=dataObj[onWhicItIsDepending].downstream; //we go to the downstream of onwhich element depending and remove it from its downstream.
  
  for(let i=0;i<oldDownStream.length;i++){
  if(oldDownStream[i] != dependent){ 
      newDownStream.push(oldDownStream[i]);
  }
  }
  dataObj[onWhicItIsDepending].downstream=newDownStream;
}

function updateDownstreamElements(eleAddress){
  let valueobj={};
  let currCellUpstream=dataObj[eleAddress].upstream;//get (eleAddress) upstream element
  for(let i=0;i<currCellUpstream.length;i++)
   {
     let upstreamCellAddress= currCellUpstream[i]
     let upstreamCellValue=dataObj[eleaAddress].value;
      
     valueobj[upstreamCellAddress]=upstreamCellValue;
   } 

   //geting a formula which element we are updating(eleAddress)
   let currFormula=dataObj[eleAddress].formula;
   let formulaArr=currFormula.split(" ");

   for(let i=0;i<formulaArr.length;i++){
     if(valueobj[formulaArr[i]]){
       formulaArr[i]=valueobj[formulaArr[i]];
     }
   }

  currFormula=formulaArr.join(" ");
  let newValue=eval(currFormula);
  
  dataObj[eleAddress].value=newValue;

  let cellOnUI=document.querySelector(`[data-address=${eleAddress}]`);
  cellOnUI.innerText=newValue;

  let currCellDownStream=dataObj[eleAddress].downstream;
  if(currCellDownStream.length>0){  
  for(let k=0;k<currCellDownStream.length;k++){
      updateDownstreamElements(currCellDownStream[k]);
      }
    }
}





























/*for add more column-tag to the page//
if(i==25){
  while(count<26){
    let div=document.createElement("div");
    div.classList.add("column-tag-cell");
    let AtoZ=String.fromCharCode(65+j);
    div.innerText=AtoZ+String.fromCharCode((65+k));
    columnTags.append(div);
    k++;
    if(k==26){
      k=0;
      j++;
      count++;
    }
  }
}

for add column in the page //
if(j==25){
      while(count<26){
        let cell=document.createElement("div");
        cell.classList.add("cell");
        cell.contenEditable=true;
        row.append(cell);
        k++;
        if(k==26){
          k=0;
          m++;
          count++;
        }
      }
    }*/