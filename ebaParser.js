// this file parses the EBA XML data using JS DOM manipulation
// Written by: Tony Le

(function() {
	// var txt= "http://www.emmabandrews.org/eba_diary_content/eba_volume_19/volume-19_1912-1913.xml";
	var file = "volume-19_1912-1913.xml";
	var entireJSON; // variable for the entire converted JSON
	// global variables go here
	//
	//
	$(document).ready(function () {
		callingXML();
		createStructure();
	});

	function callingXML() {
	    var xmlDoc = loadXMLDoc(file);
	    var x2js = new X2JS();
	    entireJSON = x2js.xml2json(xmlDoc);
	 	console.log(entireJSON);
	 	//console.log("break");
	}

	function loadXMLDoc(fileName) {
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET", fileName, false);
        xhttp.send();
        return xhttp.responseXML;
    }

    // create function to go through each JSON line
    // probably create individual objects and / or arrays for each "entry"
  function createStructure() {
  // loops over all 27 entries
        entireJSON.TEI.text.body.div.forEach(function(entry) {
   			//console.log(entry);

   			// loops over date and paragraph of each 27 
   			entry.p.forEach(function(dp) {
   				//console.log(dp);
   			  var singleEntry = document.createElement("div");
   				$(singleEntry).attr("class", "allEntries");
   				var dateDiv = document.createElement("div");
   				var dateCurr = dp.title;
   				var nameCurr = dp.__text;
   				dateDiv.innerHTML = dateCurr;
   				dateDiv.style.textDecoration="underline";
   				singleEntry.innerHTML = nameCurr;
   				//console.log(dateCurr)
   				if (typeof(dateCurr) != "undefined") {
   					document.body.appendChild(dateDiv);
   				}
   				if (typeof(nameCurr) != "undefined") {
   					document.body.appendChild(singleEntry);
   				}
   			});
		});
    }
})();