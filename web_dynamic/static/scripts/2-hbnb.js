const $ = window.$;

$(document).ready(function () {
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data, strStat, xhr) {
    if (xhr.status === 200) {
      // alert("xhr.status: " + xhr.status);
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
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
});
