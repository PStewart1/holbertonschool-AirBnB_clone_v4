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
});
