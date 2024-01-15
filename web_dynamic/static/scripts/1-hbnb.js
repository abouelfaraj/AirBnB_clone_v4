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
    for (key in ameniData) {
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
});
