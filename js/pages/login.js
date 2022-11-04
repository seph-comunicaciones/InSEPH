//Validacion formulario
$.extend(window.Parsley.options, {
  focus: "first",
  excluded:
    "input[type=button], input[type=submit], input[type=reset], .search, .ignore",
  triggerAfterFailure: "change blur",
  errorsContainer: function (element) {},
  trigger: "change",
  successClass: "is-valid",
  errorClass: "is-invalid",
  classHandler: function (el) {
    return el.$element.closest(".form-group");
  },
  errorsContainer: function (el) {
    return el.$element.closest(".form-group");
  },
  errorsWrapper: '<div class="parsley-error"></div>',
  errorTemplate: "<span></span>",
});

Parsley.on("field:validated", function (el) {
  var elNode = $(el)[0];
  if (elNode && !elNode.isValid()) {
    var rqeuiredValResult = elNode.validationResult.filter(function (vr) {
      return vr.assert.name === "required";
    });
    if (rqeuiredValResult.length > 0) {
      var fieldNode = $(elNode.element);
      var formGroupNode = fieldNode.closest(".form-group");
      var lblNode = formGroupNode.find(".form-label:first");
      if (lblNode.length > 0) {
        var errorNode = formGroupNode.find(
          "div.parsley-error span[class*=parsley-]"
        );
        if (errorNode.length > 0) {
          var lblText = lblNode.text();
          if (lblText) {
            errorNode.html(lblText + " es necesario.");
          }
        }
      }
    }
  }
});

//Login
$("#form_login").on("submit", (event) => event.preventDefault());

$("#btn_login").click(() => {
  if ($("#usuario").val().length > 0 && $("#password").val().length > 0) {
    const a = document.createElement("a");
    a.href = "dashboard.html";
    a.click();
  }
});
