'use strict';

var rows = 7;
var running = true;

var randomColor = function() {
  return '#' + Math.random().toString(16).slice(2, 8);
};

var getTotal = function() {
  return rows * 12;
}

var getBoxHeight = function() {
  return (getTotal() / 12) * 70;
}

var setColor = function(colorVal) {
  $("#selected_color").css('background-color', colorVal);
  $('#color_rgb').html(w3color(colorVal).toRgbString());
  $('#color_rgba').html(w3color(colorVal).toRgbaString());
  $('#color_hex').html(w3color(colorVal).toHexString());
  $('#color_hsl').html(w3color(colorVal).toHslString());
  $('#color_hwb').html(w3color(colorVal).toHwbString());
  $('#color_cmyk').html(w3color(colorVal).toCmykString());
  $('#color_ncol').html(w3color(colorVal).toNcolString());
}

var printBoxes = function() {
  $(".box-wrapper").html("");
  $(".box-wrapper").css('height', getBoxHeight() + 'px');
  for (var i = 0; i < getTotal(); i++) {
    $(".box-wrapper").append('<div class="box col-xs-1"></div>');
  }
}

var registerOnBoxEvent = function() {
  $(".box").on("mouseenter", function() {
    $(this).css('background-color', randomColor());
    $(this).css('box-shadow', "0 0 8px white");
    $(this).css('z-index', "100000");
  });

  $(".box").on("mouseleave", function() {
    $(this).css('box-shadow', "none");
    $(this).css('z-index', "1");
  });
}

var registerOffBoxEvent = function() {
  $(".box").off("mouseenter");
  $(".box").off("mouseleave");
}

var registerEvent = function() {

  registerOnBoxEvent();

  $(".box").click(function() {
    var colorVal = $(this).css('background-color');
    if (colorVal == "rgba(0, 0, 0, 0)") {
      setColor("grey");
    } else {
      setColor(colorVal);
    }
  });

  $('#ResetColor').click(function() {
    printBoxes();
    registerEvent();
  });

  $('#SetRole').click(function() {
    rows = $("#rowNumber").val();
    printBoxes();
    registerEvent();
  });
}

var registerPauseEvent = function() {
  $(".box").dblclick(function() {
    running = !running;
    if (running == false) {
      registerOffBoxEvent();
      $('#pauseStatus').html("Start");
    } else {
      registerOnBoxEvent();
      $('#pauseStatus').html("Pause");
    }
  })

  $(".copyColor").click(function() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(this).closest('td').prev('td').text()).select();
    document.execCommand("copy");
    $temp.remove();
  });
}

$(document).ready(function() {
  printBoxes();
  registerEvent();
  registerPauseEvent();
  $("#rowNumber").val(7);
  $('#pauseStatus').html("Pause");
  setColor("grey");
});
