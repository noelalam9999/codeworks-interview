var html = `<div class="card">`
html +=`<div class="container">`
html +=`<i style="display:inline" class="fa fa-user"></i>&ensp;<h4 style="display:inline" class="name"><b></b></h4><br><br>` 
html +=`<i style="display:inline" class="fa fa-phone"></i>&ensp;<p style="display:inline" class="phone-number"></p><br><br>`
html +=`<i style="display:inline" class="fa fa fa-home"></i>&ensp;<p style="display:inline" class="address"></p> ` 
html +=`<span style="display:inline;float:right;top:20px"><button onClick="DeleteRecord(this.id)" class="delete-button" type="submit">Delete</button></span>`
html +=`</div>`
html +=`</div>`

var no_results = "<p>No results</p>"



//Database
var records = [
    {
        id:1,
        name:"Noel",
        surname:"Alam",
        phoneNumber:"01740035118",
        address:"1/4 Baker Street"
    } ,
 {
        id:2,
        name:"John",
        surname:"Doe",
        phoneNumber:"01740035118",
        address:"Dhaka"
    } 
   

] 


//On Initial Page Load
// [1]
function onInitialLoad(data){

    data.length>0 ? data.map((record,key)=>{
        $(".cards").append(html)// create an empty html card
        $(".name:eq("+key+")").text(record.name+" "+record.surname)
        $(".phone-number:eq("+key+")").text(record.phoneNumber)
        $(".address:eq("+key+")").text(record.address)
        $(".delete-button:eq("+key+")").attr("id",record.id) //assigning values to the ids
    }) : $(".cards").text("No result")
}

//Updating List [2]
function onUpdate(data){
    $(".cards").empty() // cleaning the container
     
    if(data[0]!=undefined){ //If there is element in the passed array update the DOM
        data = data.sort((a,b)=>{return b.id-a.id})    // Sorting my largest id value to smallest. Latest entry will be shown first
        data.map((record,key)=>{
       
        $(".cards").append(html)
        $(".name:eq("+key+")").text(record.name+" "+record.surname)
       
        $(".phone-number:eq("+key+")").text(record.phoneNumber)
        $(".address:eq("+key+")").text(record.address)
        $(".delete-button:eq("+key+")").attr("id",record.id)
       
    })}  //Inserting filtered search data into the HTML elements
    else{
        $(".cards").text("No result")
    }
}

//Search Field [2]
function onInputChange(){ // Taking in search input value
    var str = $("#input").val().toLowerCase()
    console.log(str)
    var new_records = []
    for(var i=0;i<records.length;i++){
        if(records[i].name.toLowerCase().indexOf(str) > -1 || records[i].surname.toLowerCase().indexOf(str)>-1)  
            new_records.push(records[i]) //Inserting search data into a new array 
          
    }

  onUpdate(new_records) //Updating the DOM
}

//Delete Record [6]
function DeleteRecord(id){
    $("#deleteRecordModal").css("display","block") // promping the user if he actually wants to delete the record
    
    $("#delete-yes-button").click(()=>{ //If the user clicks on yes the record is omitted from the array
        for(i=0;i<records.length;i++){
            if(records[i].id==id){
                records.splice(i,1)
            }
        }
        $(".modal").css("display","none") // modal is closed

        onUpdate(records) // DOM is updated
       
        $("#deleteConfirmationModal").css("display","block") //Successful deletion is shown
          
    }  )
    
    
}

//Add Record
function Submit(){
    sorted = records.sort((a,b)=>{return b.id-a.id})  
    var record = {id:"",name:"",surname:"",phoneNumber:"",address:""}
    record.id = sorted[0].id+1
    record.name= $("#name").val()
    record.surname= $("#surname").val()
    record.phoneNumber= $("#phone-number").val()
    record.address= $("#address").val()   
    $("#form").trigger("reset")// form is reset
    sorted.push(record)
    onUpdate(sorted)
    $(".modal").css("display","none")
    $("#addConfirmationModal").css("display","block")
    
}



//Modal Functions
function closeModal(){
    $(".modal").css("display","none")
}

//Main
$(document).ready(function(){

onInitialLoad(records)
// [4]
$('input').on('input',()=>{ onInputChange()});

//Modals
// [3]
$("#add-button").click(function(){$("#addRecordModal").css("display","block") } )
// [5]
$("#delete-no-button").click(()=>{{$(".modal").css("display","none")}}  )

$(".close").click(()=>{{$(".modal").css("display","none")}}  )

$(document).on('submit', '#form', function() {

    return false;
   })

})




//Citations

//[1] https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
//[2] https://www.w3schools.com/howto/howto_css_searchbar.asp
//[3] https://stackoverflow.com/questions/5697058/jquery-onclick-event
//[4] https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninput - On input change
//[5] https://www.w3schools.com/jquery/jquery_css.asp
//[6] https://stackoverflow.com/questions/34336633/remove-object-from-array-knowing-its-id - removing an object from an array