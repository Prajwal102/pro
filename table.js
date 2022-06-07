
var rownum = 0;
// document.body.addEventListener( 'change', function ( event ) {
//     console.log("change listener")
//     console.log(event.target);
//   } );

function download_table_as_csv(table_id, separator = ',') {
    // Select rows from table_id
    var csv = [];
    var row = []
    var rows = document.querySelectorAll('#' + table_id + ' tr');
    var headerrows = document.querySelectorAll('#' + table_id + ' th');
    for (var i = 0; i < headerrows.length; i++) {
        hname = headerrows[i].innerHTML;
        row.push('"' + hname + '"');
    }
    csv.push(row.join(separator));
    
    // Construct csv
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('th, td');
       
        for (var j = 0; j < cols.length-1; j++) {
            let colval = cols[j].firstChild.value;
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = colval.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    console.log(csv)
    console.log(csv_string)
    // Download it
    var filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function initialiseTable(header_names){
    var table =  document.getElementById('table_id');
    const body = document.querySelector('.table_class');
    if (typeof(table) == 'undefined' || table == null)
    {
        var table = document.createElement('table');
        table.setAttribute('id', 'table_id');
        var thead = document.createElement('thead');

        table.appendChild(thead);

        for (var i=0; i<header_names.length; i++) {
            thead.appendChild(document.createElement("th")).
                appendChild(document.createTextNode(header_names[i]));
        }
        body.append(table);
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

    let dropvalue = x.target.value;
    let selectrow = x.target.parentNode.parentNode;
    let rindex = selectrow.id
    for(const prop in info){
        delon = info[prop]['deleteOn']
        if(typeof(delon) != 'undefined'){
            let parent_elem = document.getElementById(`${rindex}_${prop}`);
            let child_elem = parent_elem.querySelector('input')
            child_elem.removeAttribute("disabled");
            if(delon.includes(dropvalue)){
                child_elem.setAttribute("disabled", true);
            }
        }
    }
}

function addRow(){
    info = {

        tablename : {header_name:'Table Name',type:'input',deleteOn:[]},
        data_source : {header_name:'Data Source',type:'input',deleteOn:["replace"]},
        ta :{header_name:'Therapeutic Area',type:"input",deleteOn:["append"]},
        disease_area :{header_name:'Disease Area',type:"input",deleteOn:["delete"]},
        transfer_type :{header_name:'Transfer Type',type:"select",options:["replace","new","append","recreate","delete"],default_message:"Select Transfer Type"},
        delim :{header_name:'Delimiter',type:"select",options:["|",",","\\001"],default_message:"Select Delimiter"},
        date_range : {header_name:'Date Range',type:"input",deleteOn:["new","append"]},
        delete_btn:{type:'button'}
   
   }

    header_names = gettableHeaders(info);

    initialiseTable(header_names);

    let tableRef = document.getElementById("table_id");
  
    let newRow = tableRef.insertRow()
    newRow.setAttribute("id",`tr_${rownum}`);

    for(const prop in info){
        let newCell = newRow.insertCell();
        newCell.setAttribute("id",`tr_${rownum}_${prop}`);
        type = info[prop]['type']
        if (type == 'input'){
            var textelem = document.createElement("input");
            textelem.setAttribute('type', 'text');
            textelem.setAttribute("disabled", true);
            newCell.appendChild(textelem);
        }
        else if(type == 'select'){
            let options = info[prop]['options']
            let default_message = info[prop]['default_message']
            var selectList = document.createElement("select");
            selectList.setAttribute("class", "form-select");
            
            selectList.addEventListener('change',selectchange);
            newCell.appendChild(selectList);
            var option = document.createElement("option");
            option.text = default_message;
            option.setAttribute('disabled', 'true');
            option.setAttribute('selected', 'true');
            selectList.appendChild(option);
            // <option value="" disabled selected>Select your option</option>
            for (var i = 0; i < options.length; i++) {
                var option = document.createElement("option");
                option.value = options[i];
                option.text = options[i];
                selectList.appendChild(option);
            }
        }
        else if(type == 'button'){ // hardcoded only for delete button
            var delete_btn = document.createElement("input")
            delete_btn.setAttribute("type","button");
            delete_btn.setAttribute("value","DELETE");
            delete_btn.setAttribute("id", "del_btn");
            delete_btn.setAttribute("class", "btn btn-danger");

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
    
    rownum++;

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
  