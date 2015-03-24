$(document).ready(function() {

	var client = new ZeroClipboard( document.getElementById("clickcopy") );

	$('#clickcopy').tipsy();

	client.on( "ready", function( readyEvent ) {
	  // alert( "ZeroClipboard SWF is ready!" );
		  
	  client.on( "aftercopy", function( event ) {
	    // `this` === `client`
	    // `event.target` === the element that was clicked
	    event.target.style.display = "block";
	    $('#email').is(':empty') ? $('.tipsy-inner').html('nothing to copy!') : $('.tipsy-inner').html('copied!');
	  } );
	} );

	function getData () {
	    return $.ajax({
	      dataType: 'json',
	      url: '../data/docs.json',
	      data: '',
	      success: function(data) {
	         return data;
	        }
	    });
	}

	$.when (getData()).done(function (docs) { 
		var docDict = {};
		 	docs.forEach (
		      function (object) {
		        var fullName = object.full_name;
		        if (! (fullName in docDict)) {
		            docDict[fullName]={fullName:0, npi:0, title:0, specialty:0, specialtyTwo:0, streetOne:0, streetTwo:0, streetCity:0, streetZip:0, streetCounty:0, streetState:0, streetPhone:0, email:0, licenseNum:0, licenseState:0};
		        }
		        docDict[fullName]['fullName'] = object.full_name;
		        docDict[fullName]['npi'] = object.npi;
		        docDict[fullName]['title'] = object.title;
		        docDict[fullName]['specialty'] = object.specialty;
		        docDict[fullName]['specialtyTwo'] = object.specialty_2;
		        docDict[fullName]['streetOne'] = object.street_address_1;
		        docDict[fullName]['streetTwo'] = object.street_address_2;
		        docDict[fullName]['streetCity'] = object.street_city;
		        docDict[fullName]['streetZip'] = object.street_zip;
		        docDict[fullName]['streetCounty'] = object.street_county;
		        docDict[fullName]['streetState'] = object.street_state;
		        docDict[fullName]['streetPhone'] = object.street_phone;
		        docDict[fullName]['email'] = object.email;
		        docDict[fullName]['licenseNum'] = object.license_number;
		        docDict[fullName]['licenseState'] = object.license_state;
		      }
		    )

		var docNames = Object.keys(docDict);


		var substringMatcher = function(strs) {
		  return function findMatches(q, cb) {
		    var matches, substringRegex;
		    matches = [];
		    substrRegex = new RegExp(q, 'i');
		    $.each(strs, function(i, str) {
		      if (substrRegex.test(str)) {
		        matches.push({ value: str });
		      }
		    });

		    cb(matches);
		  };
		};


		$('#scrollable-dropdown-menu .typeahead').typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 1
		},
		{
		  name: 'states',
		  displayKey: 'value',
		  source: substringMatcher(docNames)
		})
			.bind('typeahead:cursorchanged', lookUp)
			.bind('typeahead:selected', lookUp)
			.bind('typeahead:autocompleted', lookUp);

		  function lookUp (event, object) {
		  	var fullName = docDict[object.value]['fullName'];
		    var npi = docDict[object.value]['npi'];
		    var specialty = docDict[object.value]['specialty'];
		    var streetOne = docDict[object.value]['streetOne'];
		    var streetTwo = docDict[object.value]['streetTwo'];
		    var streetZip = docDict[object.value]['streetZip'];
		    var streetPhone = docDict[object.value]['streetPhone'];
		    var email = docDict[object.value]['email'];
		    var licenseNum = docDict[object.value]['licenseNum'];
		    var licenseState = docDict[object.value]['licenseState'];


		    $('#fullName').text(fullName);
		    $('#specialty').text(specialty);
		    $('#npi').text(npi);
		    $('#address').text(streetTwo !== "" ? streetOne.concat(", ",streetTwo) : streetOne);
		    $('#streetZip').text(streetZip);
		    $('#streetPhone').text(streetPhone);
		    $('#email').text(email);
		    $('#licenseNum').text(licenseNum);
		    $('#licenseState').text(licenseState);
		  }



	});
});


