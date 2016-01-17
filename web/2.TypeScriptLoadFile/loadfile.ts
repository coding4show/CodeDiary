function Start() : void 
{    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = "text";
    xmlHttp.onload = function(){
        document.body.innerText = xmlHttp.responseText;
    }
    xmlHttp.open("GET", "testloadfile.txt", true);
    xmlHttp.send(null);
}

