const taskContainer = document.querySelector(".task_container");
let globalStore = []; //array of objects 
console.log(taskContainer);


const generateNewCard = (taskData) => 
    `  <div class="col-sm-12 col-md-6 col-lg-4 ">
            <div class="card mt-3" style="height: 50">
              <div class="card-header d-flex justify-content-end gap-1">
                <button type="button" class="btn btn-outline-success "><i class="fas fa-pencil-alt"></i></button>
                <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
              </div>
              <div class="card-body">
                <img src=${taskData.imageUrl} 
                class="card-img-top" alt="...">
                <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
                <p class="card-text">${taskData.teaskDescription}</p>
                <span class="badge bg-primary">${taskData.taskType}</span>
              </div>
              <div class="card-header d-flex gap-2">
                <button type="button" class="btn btn-outline-primary">Open Task</i></button>
              </div>
            </div>
          </div>`  //with backticks we dont use curly braces as it itself provides the properties of curly braces
;

const loadInitialCardData = () => {
    //loaclStorage to get tasky card data
    const getCardData = localStorage.getItem("tasky");

    //convert to normal object
    const {cards} = JSON.parse(getCardData);

    //loop over those array of task object to create HTML card, inject it to DOM
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

        //update our globalStore
        globalStore.push(cardObject);
    });

};

//Delete function
const deleteCard = (event) => {
  event = window.event;  //window is parent for anything we do on screen
  const targetID = event.target.id;   //we defined id
  const tagname = event.target.tagName;  ///tagName is a method
  
  console.log(event);
  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  console.log(globalStore);
  localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};


const saveChanges = () => {
    const taskData = {
        id:  `${Date.now()}`, //Date.now() generates a unique id every second
        imageUrl: document.getElementById("imageurl").value,  //document is the parent of html
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        teaskDescription: document.getElementById("taskdescription").value
    } 

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));
    
    globalStore.push(taskData);
    localStorage.setItem("tasky",JSON.stringify({cards: globalStore})); //localStorage -> represents our local storage, setItems-> setting whatever is in second parameter to local storage
    //push cant be used in localStorage
    //tasky -> specific id so that we get only our data in local storage
};


//Isuues

//Page refreshes causes the data to get deleted
//API-> application programming interface
//loacal storage -> Accessing application via local storage
//Interface-> Interface means middle man


//Features - Delete, edit, open the card, search

