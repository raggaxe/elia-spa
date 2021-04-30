$(function () {
    var socket_notify = io.connect();

    $('#variacao').change(function(){
        var this_value = $(this).val();
        $('#' + this_value + '-tab').click();
})

    $( function() {
        $( ".imgBack-item" ).draggable();
});

    $('.font-primaria').change(function(){
        $('.tituloinnerStatsOver').css('color', $(this).val() );
    })

    $('.font-secundaria').change(function(){
        $('.scoreinnerStatsOver').css('color', $(this).val() );
    })

    $('.userOverName').change(function(){
        $('.userOverlay').css('color', $(this).val() );
    })




$('.click-to-copy').click(function(){
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($('#link-input').text()).select();
  document.execCommand("copy");
  $temp.remove();
 })











  $("[data-toggle='toggle']").click(function () {
    var selector = $(this).data("target");
    $(selector).toggleClass("in");
  });

  $(".msg").click(function () {
    $(".getMsg").addClass("in");
  });

  socket_notify.on("notify", function (data) {
    document.getElementById("notify").click();
  });

  function changeLido(this_id) {
    document.getElementById(this_id).classList.remove("noLido");
    document.getElementById(this_id).classList.remove("statusItem");

    var noty = document.querySelectorAll(".noLido").length;

    if (parseInt(noty) > 1) {
      document.querySelector(".badgel").innerHTML = noty;
    }

    if (parseInt(noty) == 0) {
      document.querySelector(".badgel").style.display = "none";
    }

    $.ajax({
      url: "/change_status_notify_lido",
      data: { index: this_id },
      type: "POST",
      success: function (res) {
        if (res["erro"]) {
          console.log(res);
        }
        if (!res["erro"]) {
          console.log(res);
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  function PlayerSubmit(find_id) {
    const username = document.getElementById(find_id).value;

    $.ajax({
      url: "/fillPlayer",
      data: { user: username },
      type: "POST",
      success: function (res) {
        if (res["erro"]) {
          console.log(res);
        }

        if (!res["erro"]) {
          var foto = res["foto"];
          var token = res["id_user"];
          var username = res["username"];

          document.getElementById(find_id + "Card").classList.add("greenBold");
          document.getElementById(find_id).style.display = "none";
          document.getElementById(find_id + "Label").style.display = "block";
          document.getElementById(find_id + "Label").innerHTML = username;
          document.getElementById(find_id + "Btn").style.display = "none";
          document.getElementById(find_id + "Close").style.display = "block";
          document.getElementById(find_id + "Position").style.display = "block";

          if (foto != "utilizador.png") {
            var src = "/playerFoto/" + foto + "/" + username;
            document.getElementById(find_id + "Avatar").innerHTML ==
              '<img src="' + src + '">';
          }
          if (foto == "utilizador.png") {
            var src = "/uploads/" + foto;
            document.getElementById(find_id + "Avatar").innerHTML =
              '<img src="' + src + '">';
          }
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  function reloadPlayer(find_id) {
    document.getElementById(find_id + "Card").classList.remove("greenBold");
    document.getElementById(find_id).style.display = "block";
    document.getElementById(find_id + "Label").style.display = "none";
    document.getElementById(find_id + "Btn").style.display = "block";
    document.getElementById(find_id + "Close").style.display = "none";
    document.getElementById(find_id + "Position").style.display = "none";
    document.getElementById(find_id + "Avatar").innerHTML =
      '<i style="margin-bottom:1.1rem;" class="fas fa-plus addIcone"></i>';
  }

  function addSquadCard(element, e) {
    element.querySelector(".areaIcone").style.display = "none";
    element.querySelector(".hiddenSquad").style.display = "block";
    element.querySelector(".nameSquadIn").innerHTML = e.squadName;
    element.querySelector(".innerTitleEdit").innerHTML = e.squadName;
  }

  function addItemNoVazio(element, i, x) {
    element.querySelectorAll(".userInnerEdit2")[i].style.display = "block";

    if (x.status == "ok") {
      element.querySelectorAll(".statusItem2")[i].classList.remove("stB");
      element.querySelectorAll(".statusItem2")[i].classList.add("stG");
      element.querySelectorAll(".statusItem3")[i].classList.remove("stB");
      element.querySelectorAll(".statusItem3")[i].classList.add("stG");
    }

    if (x.status == "recusado") {
      element.querySelectorAll(".statusItem2")[i].classList.remove("stB");
      element.querySelectorAll(".statusItem2")[i].classList.add("stR");
      element.querySelectorAll(".statusItem3")[i].classList.remove("stR");
      element.querySelectorAll(".statusItem3")[i].classList.add("stR");
    }

    element.querySelectorAll(".labelInnerEdit")[i].innerHTML = x.username;
    element.querySelectorAll(".kd")[i].innerHTML = x.playerMW.KD;
    element.querySelectorAll(".kg")[i].innerHTML = x.playerMW.KG;
    element.querySelectorAll(".kills")[i].innerHTML = x.playerMW.kills;
    element.querySelectorAll(".wins")[i].innerHTML = x.playerMW.wins;
    element.querySelectorAll(".top5")[i].innerHTML = x.playerMW.top5;
    element.querySelectorAll(".games")[i].innerHTML = x.playerMW.games;

    var insertP = element.querySelectorAll(".imgSquad")[i];
    if (x.foto != "utilizador.png") {
      insertP.setAttribute("src", "/playerFoto/" + x.foto + "/" + x.auth);
    }
    if (x.foto == "utilizador.png") {
      insertP.setAttribute("src", "/uploads/" + x.foto);
    }

    var insertP2 = element.querySelectorAll(".imgSquad2")[i];

    if (x.foto != "utilizador.png") {
      insertP2.setAttribute("src", "/playerFoto/" + x.foto + "/" + x.auth);
    }

    if (x.foto == "utilizador.png") {
      insertP2.setAttribute("src", "/uploads/" + x.foto);
    }
  }

  $(".itemEdit2").on("click", function () {
    $(this).find(".open").hide();
    $(this).find(".itemEdit3").show();
  });

  $(".pp").on("click", function () {
    $(this)
      .closest(":has(div.barraSeek)")
      .find(".ativado")
      .removeClass("ativado");
    $(this).toggleClass("ativado");
    $(this)
      .closest(":has(div.barraSeek)")
      .find(".plat-new")
      .val($(this).attr("data-id"));
  });

  $(".nn").on("click", function () {
    var i = $(this).attr("data-id");
    var username = $(this)
      .closest(":has(div.barraSeek)")
      .find(".tracker")
      .val();
    var item = $(this).closest(":has(.itemEdit)").find(".itemEdit")[i];
    var item2 = $(this).closest(":has(.itemEdit)").find(".itemEdit2")[i];

    var input = $(this).closest(":has(.newPlayerPost)").find(".newPlayerPost");

    $.ajax({
      url: "/fillPlayer",
      data: { user: username },
      type: "POST",
      success: function (res) {
        if (res["erro"]) {
          console.log(res);
        }
        if (!res["erro"]) {
          var foto = res["foto"];
          var token = res["id_user"];
          var username = res["username"];
          item.style.display = "block";
          item2.style.display = "none";

          item.querySelector(".labelInnerEdit").innerHTML = res["username"];
          item.querySelector(".kd").innerHTML = res["gameMW"]["KD"];
          item.querySelector(".kg").innerHTML = res["gameMW"]["KG"];
          item.querySelector(".kills").innerHTML = res["gameMW"]["kills"];
          item.querySelector(".wins").innerHTML = res["gameMW"]["wins"];
          item.querySelector(".top5").innerHTML = res["gameMW"]["top5"];
          item.querySelector(".games").innerHTML = res["gameMW"]["games"];

          input.append(
            '<input name="player' +
            (parseFloat(i) + 1) +
            '" name="txtSearch" type="hidden" value="' +
            res["username"] +
            '">'
          );

          var insertP2 = item.querySelector(".imgSquad2");
          if (foto != "utilizador.png") {
            insertP2.setAttribute(
              "src",
              "/playerFoto/" + foto + res["id_user"]
            );
          }
          if (foto == "utilizador.png") {
            insertP2.setAttribute("src", "/uploads/" + foto);
          }
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  function fillModal(this_item) {
    var id_player_sair = $(this).data("player");
  }

  $(".Edit").click(function () {
    var id_modal = $(this).data("bs-target");
    $(id_modal).find(".exTitle")[0].innerHTML = $(this).data("name");
    $(id_modal).find(".auth_player")[0].value = $(this).data("player");
    $("#msgNew").find(".yourUSER")[0].value = $(this).data("name");
  });

  $(".gerarLink").bind("click", function (event) {
    gerarLink();
    return false; // dont move to top
  });



  $(".sendMSG").bind("click", function (event) {
    getStuff();
    return false; // dont move to top
  });

  $("#chat_form").bind("submit", function (event) {
    getStuff();
    return false; // dont post it automatically
  });

  function getStuff() {
    if ($(".conteudoMSG").val() != "") {
      var user_name = $(".possa").text();
      var tabs = document.querySelectorAll(".userPane");

      if (tabs.length == 0) {
      }

      if (tabs.length > 0) {
        tabs.forEach((e) => console.log(e.id));
      }

      socket_notify.emit("private", {
        msg: $(".conteudoMSG").val(),
        to: $(".possa").text(),
      });
      createMensagem(
        "myMsgSent",
        $(".meuUSER").text(),
        $(".conteudoMSG").val()
      );
      $("#chat_form input").val("");
    }
  }

  $("#mensagens-tab").click(function () {
    var id_modal = $(this).data("bs-target");
    if ($(id_modal).find(".onBot")[0]) {
      setTimeout(function () {
        setBotOn();
      }, 4000);
    }
  });

  function setBotOn() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    document.querySelector(".bodyMsgBOT").innerHTML +=
      '<div class="container-fluid yourMsgSent botMSG ">' +
      '<div class="mensagem d-flex bd-highlight">' +
      ' <div  class=" w-100 bd-highlight">' +
      '<div  class="pin bd-highlight float-start">Arcade Arena</div>' +
      ' <p style="margin:0; padding-top:20px;">Olá Bem-Vindo ao Arcade arena!</p>' +
      ' <div class="float-end">' +
      '<p class="tempoMSG ">' +
      time +
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
  }

  function createMensagem(tipo, user, msg) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    document.querySelector(".bodyMsg").innerHTML +=
      '<div class="container-fluid ' +
      tipo +
      '">' +
      '<div class="mensagem d-flex bd-highlight">' +
      ' <div  class=" w-100 bd-highlight">' +
      '<div  class="pin bd-highlight float-start">' +
      user +
      "</div>" +
      ' <p style="margin:0; padding-top:20px;">' +
      msg +
      "</p>" +
      ' <div class="float-end">' +
      '<p class="tempoMSG ">' +
      time +
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    var scroll = $(".bodyMsg");
    scroll.animate({ scrollTop: scroll.prop("scrollHeight") });
  }

  $(".select_overlay").change(function () {
    var choice = $(this).val();
    if (choice == "facecam") {
      document.getElementById("statsSelect").style.display = "none";
      document.getElementById("facecamSelect").style.display = "block";
      document.getElementById("FacestatsSelect").style.display = "none";
    }
    if (choice == "stats") {
      document.getElementById("facecamSelect").style.display = "none";
      document.getElementById("statsSelect").style.display = "block";
      document.getElementById("FacestatsSelect").style.display = "none";
    }
    if (choice == "Facestats") {
      document.getElementById("facecamSelect").style.display = "none";
      document.getElementById("statsSelect").style.display = "none";
      document.getElementById("FacestatsSelect").style.display = "block";
    }
  });














  function findUserMsg(this_value) {
    var username = this_value;

    if (username.length == 0) {
      var divResultado = document.getElementById("searchResult");
      document.getElementById("pesquisa").style.display = "none";
      document.getElementById("hallMSG").style.display = "block";

      divResultado.innerHTML = "";
    }
    if (username.length > 0) {
      var divResultado = document.getElementById("searchResult");
      document.getElementById("pesquisa").style.display = "block";
      document.getElementById("hallMSG").style.display = "none";

      divResultado.innerHTML = "";
      $(function () {
        $.ajax({
          url: '{{ url_for("auth_routes.getUser") }}',
          data: { user: username, ative: "Autocomple_user" },
          type: "POST",
        }).done(function (data) {
          for (x in data["resp"]) {
            if (data["resp"][x]["foto"] != "utilizador.png") {
              var src =
                "/playerFoto/" +
                data["resp"][x]["foto"] +
                "/" +
                data["resp"][x]["auth"];
            }
            if (data["resp"][x]["foto"] == "utilizador.png") {
              var src = "/uploads/" + data["resp"][x]["foto"];
            }
            divResultado.innerHTML +=
              '<div class="d-flex justify-content-between getLight findUserMsg" onclick="selectFindUser(this)">' +
              '<div class="selectUserMsgSub">' +
              '<img class="selectImgMsg" src="' +
              src +
              '">' +
              "</div>" +
              '<div class="selectUserMsg buscador">' +
              data["resp"][x]["username"] +
              "</div>" +
              "</div>";
          }
          colorirExpressao(username);
        });
      });
    }
  }

  function colorirExpressao(username) {
    var all = document.querySelectorAll(".buscador");

    all.forEach(function (e) {
      var str = e.innerHTML;
      var newText = "";
      var newText = str.replace(
        username,
        '<strong class="grifo">' + username + "</strong>"
      );
      e.innerHTML = "<p>" + newText + "</p>";
    });
  }

  function selectFindUser(this_open) {
    Array.from(document.querySelectorAll(".botMSG")).forEach((el) =>
      el.remove()
    );
    var fotoSrc = this_open.querySelector(".selectImgMsg").src;
    var nameMsg =
      this_open.querySelector(".selectUserMsg").innerText ||
      element.textContent;

    createTabUser(nameMsg, fotoSrc);

    $(".hallMSG")
      .find(".pesquisaNew")
      .each(function () {
        if ($(this).attr("id") == nameMsg + "-tab") {
          $(this).click();
        }
      });
  }

  function createTabUser(user_name, fotoSrc) {
    $("#pesquisa").hide();
    $("#hallMSG").show();
    $("#naoMSG").hide();
    $(".myTabTemp").append(
      '<li class="getLight" role="presentation">' +
      '<div class="d-flex flex-row pesquisaNew" id="' +
      user_name +
      '-tab" data-bs-toggle="tab" data-bs-target="#' +
      user_name +
      '" type="button" role="tab" aria-controls="' +
      user_name +
      '" aria-selected="true">' +
      '<div class="selectUserMsgSub">' +
      '<img src="' +
      fotoSrc +
      ' ">' +
      "</div>" +
      '<div class="selectUserMsg">' +
      user_name +
      "</div>" +
      "</div>" +
      " </li>"
    );

    $("#v-pills-tabContent").append(
      '<div class="tab-pane fade " id="' +
      user_name +
      '" role="tabpanel" aria-labelledby="' +
      user_name +
      '-tab">' +
      '<div class="cabecaMSG">' +
      '<div class="d-flex">' +
      '<div class="selectUserMsgTop">' +
      '<img class="selectImgMsg" src="/static/assets/ArcadeArena-01.svg">' +
      "</div>" +
      '<div class="usernameTopMSg ">' +
      '<div class="possa">' +
      user_name +
      "</div>" +
      '<div class="possaSub">player MW</div>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="bodyMsg d-flex flex-column">' +
      "</div>" +
      '<form class="formMSG" action="" method="post" id="chat_form">' +
      '<div class="rodapeMSg d-flex">' +
      '<div class="pesquisaBox w-100 ">' +
      '<input class="form-control conteudoMSG" type="text" placeholder="Digite uma mensagem" value="" required>' +
      " </div>" +
      '<div class="pesquisaBox flex-shrink-1">' +
      '<img class="invert sendMSG" src="/static/assets/icones/send.svg" width="20">' +
      "</div>" +
      "</div>" +
      "</form>" +
      "</div>"
    );
  }





});
