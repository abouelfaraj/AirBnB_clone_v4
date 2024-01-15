$(function() {}
  const ameniData = {};
  $(':checkbox').change9function (e) {
    let ameniId = $(this).attr('data_id');
    let ameniName = $(this).attr('data_name');
    if (this.checked) {
      ameniData[ameniId] = ameniName;
    } else {
      delete ameniData[ameniId];
    }
    let ameniStr = '';
    let check_flag = 0;
    let check_key = '';
    for (let key in ameniData) {
      if (check_flag === 0) {
        check_key = key;
        ameniStr += ameniData[key];
        check_flag = 1;
    } else if ( check_flag === 1) {
      if (key === check_key) {
        continue;
      }
      ameniStr += ', ' + ameniData[key];
    }
   }
   $('.amenities h4').text(ameniStr);
  });
  
  let ameniIDs = [];
  $('section button').click(function () {
    ameniIDs = [];
    for (let item in ameniData) {
      ameniIDs.push(item);
    }
    search_places(ameniIDs, 1));
  });
  search_places(ameniIDs, 0);
  // search places
  function search_places (ameniIDs, nbr) {
    let query = {'amenities': ameniIDs};
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      data: JSON.stringify(query),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
	console.log('query', query);
	console.log('ameniIDs', ameniIDs);
	console.log('data', data);
	console.log('nbr', nbr);

	if (nbr === 1) {
	  $('.places article').remove();
	}
	for (let obj of data) {
	  $('.places').append('<article><div class="title"><h2>' + obj['name'] + '</h2> <div class="price_by_night">$' + obj['price_by_night'] + '</div></div> <div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria hidden="true"></i><br />' + obj['max_guest'] + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria hidden="true"></i><br />' + obj['number_rooms'] + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + obj['number_bathrooms'] + ' Bathroom</div></div><div class="description"><br />' + obj['description'] + '</div></article>');
	}
      },
      error: function (e) {
        console.log('Failed response');
      }
    });
  }
  statusAPI();
});

//check API status
function statusAPI () {
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK' {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}
