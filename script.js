//-------getElements-------//
document.addEventListener("DOMContentLoaded",getBooks)

var message=document.querySelector(".message")
var Title=document.querySelector("#title")
var Auther=document.querySelector("#auther")
var Isbn =document.querySelector("#isbn")

var submitBtn=document.querySelector(".add-btn")

var bookList=document.querySelector(".book-list")

//-------eventListener------//
submitBtn.addEventListener('click',getValues)
//-----------Functions--------//

function getValues(e){
    e.preventDefault()
    data=[]
    data=`${Title.value},${Auther.value},${Isbn.value}`
  var  finalArr=data.split(',')
      
      displayValues(finalArr)
      
    
}


function displayValues(value){
       storeLocal(value)
    
        var title =value[0]
    var auther =value[1]
    var isbn =value
    [2]
    if(value[0]="" || value[1]=="" || value[2]==""){
        var msg="Please fill in all details!"
        var clr="red"
        showMessage(msg,clr)
        

    }else{
        var msg="Book added successfully!"
        var clr="#3498db"
        showMessage(msg,clr)
        var tr=document.createElement('tr')
        tr.innerHTML=` <td>${title}</td> <td>${auther}</td> <td>${isbn}</td> <td class="action"><button id="action-btn">X</button></td>`;
        bookList.appendChild(tr)
        //alert("submit")
    Title.value="";
    Auther.value="";
    Isbn.value="";
        
    }
  
    
}



function showMessage(msg,color){
    var p=document.createElement('p')
    p.innerText=msg
    message.style.background=color;
    message.classList.add('messageBox')
    message.appendChild(p)
    setTimeout(function(){
            message.style.display="none"
         p.innerText=""; 
         p.remove()  
        },2000)
        message.style.display="flex";
        

}


//action remove

function removeBook(event){
    var item=event.parentElement;
     
    var nodeList=event.parentNode;
    var childNode=nodeList.parentNode;
 
   var c=childNode.childNodes
   var rm=confirm("Do you want remove it")
 if(rm){
         childNode.classList.add('remove')
         var msg="Removed!"
          var color="green"
          showMessage(msg,color)
       childNode.addEventListener('transitionend',()=>{
          
          childNode.remove()
         
     });
         removeLocal(childNode)
      
     }
}
function storeLocal(values){
    var books;
    if(localStorage.getItem("books") == null){
        books=[]
    }else{
     books =JSON.parse(localStorage.getItem("books"))
    }
  books.push(values)
  localStorage.setItem("books",JSON.stringify(books))

}
function getBooks(){
    var books;
    if(localStorage.getItem("books") == null){
        books=[]
    }else{
     books =JSON.parse(localStorage.getItem("books"))
    }
  books.forEach((data)=>{
      var title =data[0]
    var auther =data[1]
    var isbn =data[2]
    if(data[0]="" || data[1]=="" || data[2]==""){
        var msg="Please fill in all details!"
        var clr="red"
        showMessage(msg,clr)
        

    }else{
        var msg="Book added successfully!"
        var clr="#3498db"
        showMessage(msg,clr)
        var tr=document.createElement('tr')
        tr.innerHTML=` <td>${title}</td> <td>${auther}</td> <td>${isbn}</td> <td class="action"><button id="action-btn"onClick="removeBook(this)">X</button></td>`;
        bookList.appendChild(tr)
        //alert("submit")
    Title.value="";
    Auther.value="";
    Isbn.value="";
        
    }
  })
}


function removeLocal(book){
    var books;
    if(localStorage.getItem("books") == null){
        books=[]
    }else{
     books =JSON.parse(localStorage.getItem("books"))
    }
       var bookIndex=book.children[0].innerText;
      index=books.indexOf(bookIndex)
    books.splice(index,1)
localStorage.setItem('books',JSON.stringify(books));
}