const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(json=>displayLesson(json.data))
}

const loadLevelWord=(id)=>{
    // console.log(id);
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then(resp=>resp.json())
    .then(data=>displayLevelWord(data.data))

}
const displayLevelWord=(words)=>{
    const wordContainer=document.getElementById("word_container")
    wordContainer.innerHTML=" ";

    if(words.length===0){
        // alert("no word")
         wordContainer.innerHTML=" "
        return;
    }

    for(let word of words){
        // console.log(word);
        const wordDiv=document.createElement("div")
        wordDiv.innerHTML=` <div class="bg-white rounded-xl shadow-sm text-center   py-8 px-6 space-y-4">
            <h1 class="font-bold text-2xl">${word.word}</h1>
            <p class="font-medium text-sm">Meaning /Pronounciation</p>
            <div class="font-medium text-2xl bangla">"${word.pronunciation}-${word.meaning}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#37495733] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
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
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open"></i>
    Learn-${lesson.level_no}
    </button>`
// 4.apppend
lavelContainer.append(btnDiv)

}
}
loadLesson()


//
