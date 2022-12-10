const $ = window.$;

$(document).ready(function () {
  const amenList = {};
  const amenity = $('.amenities input:checkbox');
  amenity.change(function () {
    if (this.checked) {
      amenList[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenList[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenList).join(', '));
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', function (data, strStat, xhr) {
    if (xhr.status === 200) {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    dataType: 'json',
    success: function (body) {
      body.forEach(place => {
        const guests = place.max_guest !== 1 ? 's' : '';
        const bedrooms = place.number_rooms !== 1 ? 's' : '';
        const bathrooms = place.number_bathrooms !== 1 ? 's' : '';
        $('section.places').append(`<article>
        <div class="title_box">
	        <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
	      </div>
        <div class="information">
	        <div class="max_guest">${place.max_guest} Guest${guests}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${bedrooms}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${bathrooms}</div>
	      </div>
        <div class="description">
	        ${place.description}
        </div>
        </article>`);
      });
    }
  });
});
