$(".profileIndex").click(function () {
  $(".collapseLogout").toggleClass("logAction");
});

$("#torneios").click(function () {
  $("html, body").animate({
    scrollTop: $("#ScrollTorneio").offset().top,
  });
});

$("#overlay").click(function () {
  $("html, body").animate({
    scrollTop: $("#session3").offset().top - 150,
  });
});

$("#stats").click(function () {
  $("html, body").animate({
    scrollTop: $("#sessao5").offset().top,
  });
});

$("#arenaTV").click(function () {
  $("html, body").animate({
    scrollTop: $("#session4").offset().top,
  });
});

$("#discord").click(function () {
  $("html, body").animate({
    scrollTop: $("#sessao6").offset().top,
  });
});

function onSuccess(googleUser) {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 312,
    height: 25,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
  gapi.signin2.render("my-signin3", {
    scope: "profile email",
    width: 120,
    height: 35,
    longtitle: false,
    theme: "light",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
}




$("#first").keyup(function () {
  var username = $(this).val();
  console.log(username);

  if ($(this).val().length > 1) {
    document.getElementById("first").classList.remove("is-invalid");
    document.getElementById("first").classList.add("is-valid");
    removeBlock();
  }
  if ($(this).val().length == 1 || $(this).val().length == 0) {
    document.getElementById("first").classList.remove("is-valid");
    document.getElementById("first").classList.add("is-invalid");
    removeBlock();
  }
});
$("#last").keyup(function () {
  var username = $(this).val();
  if ($(this).val().length > 1) {
    document.getElementById("last").classList.remove("is-invalid");
    document.getElementById("last").classList.add("is-valid");
    removeBlock();
  }
  if ($(this).val().length == 1 || $(this).val().length == 0) {
    document.getElementById("last").classList.remove("is-valid");
    document.getElementById("last").classList.add("is-invalid");
    removeBlock();
  }
});

$("#user_fill").keyup(function () {
  var username = $(this).val();

  if (username.length < 3) {
    return;
  }

  if (username.length > 3 && username.length < 13) {
    $(function () {
      $.ajax({
        url: '{{ url_for("auth_routes.getUser") }}',
        data: { user: username, ative: "username" },
        type: "POST",
      }).done(function (data) {
        if (username === data["resp"]) {
          document.getElementById("user_fill").classList.add("is-invalid");
          removeBlock();
        }
        if (username != data["resp"]) {
          document
            .getElementById("user_fill")
            .classList.remove("is-invalid");
          document.getElementById("user_fill").classList.add("is-valid");
          removeBlock();
        }
      });
    });
  } else {
    document.getElementById("user_fill").classList.remove("is-valid");
    document.getElementById("user_fill").classList.remove("is-invalid");
    removeBlock();
  }
});



$("#email").keyup(function () {
  var emailCheck = $(this).val();
  document.getElementById("email").classList.add("is-invalid");
  var valid = emailCheck.search("@");
  var valid2 = emailCheck.search(".c");
  if ($(this).val().length > 4) {
    if (valid != -1 && valid2 != -1) {
      setTimeout(function () {
        $(function () {
          $.ajax({
            url: '{{ url_for("auth_routes.getUser") }}',
            data: { user: emailCheck, ative: "email" },
            type: "POST",
          }).done(function (data) {
            if (emailCheck === data["resp"]) {
              document.getElementById("email").classList.remove("is-valid");
              document.getElementById("email").classList.add("is-invalid");
              removeBlock();
            }
            if (emailCheck != data["resp"]) {
              document
                .getElementById("email")
                .classList.remove("is-invalid");
              document.getElementById("email").classList.add("is-valid");
              removeBlock();
            }
          });
        });
      }, 1000);
    }
  } else {
    document.getElementById("email").classList.remove("is-valid");
    document.getElementById("email").classList.remove("is-invalid");
    removeBlock();
  }
});

$("#password").keyup(function () {
  var username = $(this).val();
  if (username.length > 5) {
    document.getElementById("password").classList.remove("is-invalid");
    document.getElementById("password").classList.add("is-valid");
    removeBlock();
  }
  if (username.length < 6) {
    document.getElementById("password").classList.remove("is-valid");
    document.getElementById("password").classList.add("is-invalid");
    removeBlock();
  }
  if (username.length > 12) {
    document.getElementById("password").classList.remove("is-valid");
    document.getElementById("password").classList.add("is-invalid");
    removeBlock();
  }
});

$("#Rpassword").keyup(function () {
  var username = $("#password").val();
  var check = $(this).val();
  if (username === check) {
    document.getElementById("Rpassword").classList.remove("is-invalid");
    document.getElementById("Rpassword").classList.add("is-valid");
    removeBlock();
  } else {
    document.getElementById("Rpassword").classList.remove("is-valid");
    document.getElementById("Rpassword").classList.add("is-invalid");
    removeBlock();
  }
});

function selectPlataforma(this_id) {
  document.getElementById("plataforma").value = this_id;
  var x = document.querySelectorAll(".ba .ativado");
  x.forEach(function (e) {
    if (e.id != this_id) {
      e.classList.remove("ativado");
      document.getElementById(this_id).classList.add("ativado");
    }
  });
}



const player = []


function savePlayer(e){
  e.preventDefault();
  $.ajax({
    url: "/SavePlayerActivison",
    type: "POST",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({'player':player[0]}),
    success: function (res) {
      window.location.href = "{{url_for('user_routes.dashboardUser')}}";
    },
    error: function (error) {
      window.location.href = "{{url_for('index_routes.index')}}";
    },
  });

}

function procurarUserMesmoNomeApi(username, valid) {
  $.ajax({
    url: '{{ url_for("auth_routes.getUser") }}',
    data: { user: username, ative: "Actvision", plataforma: valid },
    type: "POST",
    success: function (res) {
      console.log(res);
      if (res["resp"] != "usuario sem registro") {
        document.getElementById("pesquisarBTN").style.display = "block";
        document.getElementById("spinnerPesquisaGame").style.display =
          "none";
        document.getElementById("ErroPesquisa").style.display = "block";
      }

      if (res["resp"] == "usuario sem registro") {
        $.ajax({
          url: "/ProcurarApiCOD",
          data: { user: username, plataforma: valid },
          type: "POST",
          success: function (resp) {
            //console.log(resp);
            if (resp["resp"]) {
              document.getElementById("pesquisarBTN").style.display =
                "block";
              document.getElementById("spinnerPesquisaGame").style.display =
                "none";
              document.getElementById("ErroPesquisa").style.display =
                "block";
              document.getElementById("mudaTexto").innerHTML =
                "ESSE USUÁRIO NÃO FOI ENCONTRADO <br> TENTE NOVAMENTE!";
            } else {
              player.push(resp);
              document.getElementById("embrulho").style.display = "none";
              document.getElementById("OKPesquisa").style.display = "block";
              document.getElementById("namePesquisa").innerHTML =
                resp["username"];
              document.getElementById("levelPesquisa").innerHTML =
                "LEVEL " + resp["level"];
              document.getElementById("plataformaPesquisa").innerHTML =
                resp["plataforma"];

              if (resp["avatar"] != null) {
                document.getElementById("imagemPesquisa").src =
                  resp["avatar"];
              }
            }
          },
          error: function (error) {
            document.getElementById("pesquisarBTN").style.display = "block";
            document.getElementById("spinnerPesquisaGame").style.display =
              "none";
            document.getElementById("ErroPesquisa").style.display = "block";
            document.getElementById("mudaTexto").innerHTML =
              "ESSE NO ACESSO A API COD, ESPERE UNS MINUTOS! <br> TENTE NOVAMENTE!";
          },
        });
      }
    },
    error: function (error) {
      document.getElementById("pesquisarBTN").style.display = "block";
      document.getElementById("spinnerPesquisaGame").style.display = "none";
      document.getElementById("ErroPesquisa").style.display = "block";
      document.getElementById("mudaTexto").innerHTML =
        "ERRO NO ACESSO A API COD, ESPERE UNS MINUTOS! <br> TENTE NOVAMENTE!";
    },
  });
}

$(".searchID").on("click", function () {
  var username = $("#ActivisionId").val();

  var valid = $("#plataforma").val();
  if (username.length != 0) {
    document.getElementById("pesquisarBTN").style.display = "none";
    document.getElementById("spinnerPesquisaGame").style.display = "block";
    procurarUserMesmoNomeApi(username, valid);
  }

  if (username.length == 0) {
    return;
  }
});

$("#ActivisionId").on("keyup", function () {
  var count = document.getElementById("ActivisionId").value;
  if (count.length > 0) {
    document.getElementById("searchID").classList.remove("noClick");
  }
  if (count.length === 0) {
    document.getElementById("searchID").classList.add("noClick");
  }
});

function removeBlock() {
  var checkValids = document.querySelectorAll(".is-valid");
  if (checkValids.length === 5) {
    document.getElementById("register").classList.remove("noClick");
  }
  if (checkValids.length < 5) {
    document.getElementById("register").classList.add("noClick");
  }
}

setTimeout(function () {
  $("#Message").fadeOut("fast");
}, 3000); // <-- time in milliseconds

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var data = {
    email: profile.getEmail(),
    foto: profile.getImageUrl(),
    name: profile.getName(),
  };
  $.ajax({
    url: "/signUpGmail",
    data: data,
    type: "POST",
    success: function (res) {
      //console.log(res);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

$(".actionModal").on("click", function () {
  var id = $(this).data("actionmodal");
  document.getElementById(id).click();
});

jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    if (ns.includes("noPreventDefault")) {
      this.addEventListener("touchstart", handle, { passive: false });
    } else {
      this.addEventListener("touchstart", handle, { passive: true });
    }
  },
};

function hideTopNav() {
  document.getElementById("myTab").style.display = "none";
}

function showTopNav() {
  document.getElementById("myTab").style.display = "flex";
}
