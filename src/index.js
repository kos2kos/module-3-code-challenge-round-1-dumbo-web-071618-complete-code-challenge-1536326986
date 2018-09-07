document.addEventListener('DOMContentLoaded', function() {
  const imageId = 81 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imageCard = document.getElementById("image_card")
  imageCard.children[0].src = imageURL
  // console.log(imageCard.children[0].src)

  fetch(`${imageURL}`)
    .then(res => res.json())
    .then(image => {
      console.log(imageCard.children[1]);
      imageCard.children[0].src = image["url"];
      imageCard.children[1].innerText = image["name"];
      imageCard.children[2].innerHTML = `Likes: ${image["like_count"]}`
      imageCard.children[5].innerHTML = showComments(image["comments"])
    })
})

document.addEventListener("click", (event) => {
  console.log(event.target.id)
  if (event.target.id == "like_button"){
    increaseLike()
  }
})

document.addEventListener("click", (event) => {
  event.preventDefault()
  console.log(event.target.parentNode[0].text)
  if (event.target.value == "Submit"){
    postComment()
  }
})

function postComment(){

}
function showComments(comments){
  let commentList = ``
  for (i in comments){
    commentList+= `<li>${comments[i]["content"]}`
  }
  return commentList;
}

function increaseLike(){

  let doc = document.getElementById("image_card")
  number = doc.children[2].innerText.split(" ")[1];
  number = parseInt(number) + 1
  doc.children[2].innerText = `Likes: ${number}`
  // updatedLike(number)
  anotherUpdateLike(number)
}

function updatedLike(num){
  fetch('https://randopic.herokuapp.com/likes', {
    method: "POST",
    body: JSON.stringify({
      image_id: 81
    }),
    headers:{
    'Content-Type': 'application/json'}
  })
}

function anotherUpdateLike(number){
  let doc = document.getElementById("image_card")
  fetch("https://randopic.herokuapp.com/images/81",{
    method: "PATCH",
    body: JSON.stringify({
      "id": 1,
       "url": "https://randopic.herokuapp.com/images/81",
       "name": `${doc.children[1].innerText}`,
       "like_count": `${number}`,
    }),
    headers:{
    'Content-Type': 'application/json'}
  })
}
