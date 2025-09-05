const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(json=>displayLesson(json.data))
}
const removeActive=()=>{
    const lessonButton=document.querySelectorAll(".lesson-btn")
    // console.log(lessonButton);
    lessonButton.forEach(btn=>btn.classList.remove("active"));

}
const loadLevelWord=(id)=>{
    // console.log(id);
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then(resp=>resp.json())
    .then(data=>{
        removeActive()
        const clickBtn=document.getElementById(`lesson_btn_${id}`)
        // console.log(clickBtn);
        clickBtn.classList.add("active")
        displayLevelWord(data.data)
    })

}
const loadWordDetail=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url);
    const res=await fetch(url)
    const details= await res.json()
    displayWordDetails(details.data);

}
const displayWordDetails=(word)=>{
    // console.log(word);
    const detailsContainer=document.getElementById("details_container")
    detailsContainer.innerHTML=` <div class="">
        <h1 class="text-2xl font-bold bangla">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
      </div>
      <div class="space-y-2">
        <h1 class="text-base font-semibold">Meaning</h1>
        <p class="bangla text-base font-medium">${word.meaning}</p>
      </div>
      <div class="space-y-2">
        <h1 class="text-base font-semibold">Example</h1>
        <p class="text-base text-gray-500">${word.sentence}</p>
      </div>
      <div class="space-y-2">
        <h1 class="text-base font-semibold bangla">সমার্থক শব্দ গুলো</h1>
       <span class="btn text-gray-700"></span>
       <span class="btn text-gray-700">Enthusiastic</span>
       <span class="btn text-gray-700">Enthusiastic</span>
      </div>`
    document.getElementById("my_modal_4").showModal();

}

const displayLevelWord=(words)=>{
    const wordContainer=document.getElementById("word_container")
    wordContainer.innerHTML=" ";

    if(words.length===0){
        // alert("no word")
         wordContainer.innerHTML=`<div class="text-center col-span-full space-y-3 py-4">
        <img src="./assets/alert-error.png" alt="" class="mx-auto">
        <p class="bangla text-[#79716B] text-sm font-medium">এই Lesson এ এখনো কোনো Vocabulary যুক্ত করা হয়নি।</p>
       <h1 class="bangla text-3xl font-medium">নেক্সট Lesson এ যান</h1>
       </div>`
        return;
    }

    for(let word of words){
        // console.log(word);
        const wordDiv=document.createElement("div")
        wordDiv.innerHTML=` <div class="bg-white rounded-xl shadow-sm text-center   py-8 px-6 space-y-4">
            <h1 class="font-bold text-2xl">${word.word}</h1>
            <p class="font-medium text-sm">Meaning /Pronounciation</p>
            <div class="font-medium text-2xl bangla">"${word.pronunciation ? word.pronunciation:"শব্দ পাওয়া যায়নি"}-${word.meaning ? word.meaning:"অর্থ পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#37495733] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#37495733] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>`
        wordContainer.append(wordDiv)
    }
}

const displayLesson=(lessons)=>{
// 1`,get the container and empty
    const lavelContainer=document.getElementById("lavel-container")
    lavelContainer.innerHTML=""
// 2.get into the every lesson
for(let lesson of lessons){
    // console.log(lesson);
// 3.creat element
    const btnDiv=document.createElement("div")
    btnDiv.innerHTML=`
    <button id="lesson_btn_${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i>
    Learn-${lesson.level_no}
    </button>`
// 4.apppend
lavelContainer.append(btnDiv)

}
}
loadLesson()


//
