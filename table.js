

function initialiseTable(header_names){
    var table =  document.getElementById('table_id');
    const body = document.body;
    if (typeof(table) == 'undefined' || table == null)
    {

        console.log("inside")

        var table = document.createElement('table');
        table.setAttribute('id', 'table_id');
        var thead = document.createElement('thead');

        table.appendChild(thead);

        for (var i=0; i<header_names.length; i++) {
            thead.appendChild(document.createElement("th")).
                appendChild(document.createTextNode(header_names[i]));
        }
        body.appendChild(table);
    }
}


function gettableHeaders(info){
    var header_names = []
    for(const prop in info){
        let header = info[prop]['header_name'];
        if(typeof(header) != 'undefined'){
            header_names.push(header);
        }
    }
    return(header_names);
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function selectchange(x){

    console.log("hello",x.target.parentNode);
}

function addRow(){
    info = {

        s_no : {header_name:'S_NO',type:'input'},
        date : {header_name:'DATE',type:'input'},
        product :{header_name:'PRODUCT',type:"select",options:["p1","p2","p3"]},
        client : {header_name:'CLIENT',type:"input"},
        delete_btn:{type:'button'}
   
   }

    header_names = gettableHeaders(info);

    console.log("clicked")
    initialiseTable(header_names);

    let tableRef = document.getElementById("table_id");
  
    let newRow = tableRef.insertRow()

    for(const prop in info){
        let newCell = newRow.insertCell();
        type = info[prop]['type']
        if (type == 'input'){
            var textelem = document.createElement("input");
            textelem.setAttribute('type', 'text');
            newCell.appendChild(textelem);
        }
        else if(type == 'select'){
            let options = info[prop]['options']
            var selectList = document.createElement("select");
            selectList.addEventListener('change',selectchange);
            newCell.appendChild(selectList);
            for (var i = 0; i < options.length; i++) {
                var option = document.createElement("option");
                option.value = options[i];
                option.text = options[i];
                selectList.appendChild(option);
            }
        }
        else if(type == 'button'){
            var delete_btn = document.createElement("input")
            delete_btn.setAttribute("type","button");
            delete_btn.setAttribute("value","DELETE ROW");
            delete_btn.setAttribute("name","deleterow");
            delete_btn.onclick = function(){
                var row = this.parentNode.parentNode;
                row.parentNode.removeChild(row);
                if(document.getElementsByTagName('tbody')[0].innerHTML === ""){
                    var removeTab = document.getElementById('table_id');
                    var parentEl = removeTab.parentElement;
                    parentEl.removeChild(removeTab);
                }
                }
            newCell.appendChild(delete_btn);
            }
            

     
    }
    


}






// function addRow(tableID) {
//     // Get a reference to the table
//     let tableRef = document.getElementById(tableID);
  
//     // Insert a row at the end of the table
//     let newRow = tableRef.insertRow(-1);
  
//     // Insert a cell in the row at index 0
//     let newCell = newRow.insertCell(0);
  
//     // Append a text node to the cell
//     let newText = document.createTextNode('New bottom row');
//     newCell.appendChild(newText);
//   }
  
//   // Call addRow() with the table's ID
//   addRow('table_id');
  