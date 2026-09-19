(()=>{
  const projects=[
    {image:"./assets/flames-of-the-forgotten-02.webp",alt:"The Flames of the Forgotten interactive installation",category:"Immersive experience · Physical computing",title:"Flames of the Forgotten",description:"A multisensory installation where physical gestures shape a digital fire and its story.",href:"./flames-of-the-forgotten.html",link:"Open case study ↗"},
    {image:"./assets/speak-up-01.png",alt:"Speak Up communication app research and interface work",category:"UI/UX · Research-led app",title:"Speak Up",description:"A lower-pressure space to practise difficult conversations before the real moment.",href:"./speak-up.html",link:"Open case study ↗"},
    {image:"./assets/forged-memory-cover.webp",alt:"Forged Memory game interaction concept",category:"Game design · Interactive narrative",title:"Forged Memory",description:"An interaction study exploring how play, memory and consequence can shape a narrative.",href:"",link:"Case study in progress"}
  ];
  const rows=[...document.querySelectorAll(".project-row")];
  const image=document.querySelector("#preview-image");
  const imageWrap=document.querySelector(".preview-image-wrap");
  const number=document.querySelector("#preview-number");
  const category=document.querySelector("#preview-category");
  const title=document.querySelector("#preview-title");
  const description=document.querySelector("#preview-description");
  const link=document.querySelector("#preview-link");
  let active=0;

  function select(index){
    if(index===active&&rows[index].classList.contains("is-active"))return;
    const project=projects[index];
    active=index;
    rows.forEach((row,rowIndex)=>row.classList.toggle("is-active",rowIndex===index));
    imageWrap.classList.add("is-changing");
    window.setTimeout(()=>{
      image.src=project.image;image.alt=project.alt;number.textContent=`0${index+1} / 03`;
      category.textContent=project.category;title.textContent=project.title;description.textContent=project.description;
      link.textContent=project.link;
      if(project.href){link.href=project.href;link.hidden=false}else{link.removeAttribute("href");link.hidden=false}
      imageWrap.classList.remove("is-changing");
    },150);
  }

  rows.forEach((row,index)=>{
    row.addEventListener("pointerenter",()=>select(index));
    row.addEventListener("focus",()=>select(index));
    row.addEventListener("click",()=>select(index));
  });
})();
