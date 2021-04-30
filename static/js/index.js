  $('.tracker').bind('click', function(event) {
      clickSubmit(event);
      return false; // dont move to top
  });

  $('#get_stats').bind('submit', function(event) {
      clickSubmit(event);
      return false; // dont post it automatically
  });

  function selectPlataformaSearch(this_id){
      document.getElementById('plataforma_search').value = this_id;
      document.querySelector('.barraProcurar .btn.btn-plat.ativado').classList.remove('ativado');
      document.getElementById(this_id).classList.add('ativado');
  }

  function clickSubmit(ev){

      var username = $('#tracker_user').val();
      var valid = $('#plataforma_search').val();

      if(username != ''  ){
          document.querySelector('.loadStats').style.display = 'none';
          document.querySelector('.loadStats2').style.display = 'block';

          document.querySelectorAll('.spinEachCard').forEach(function(e){
              e.style.display = 'block';
          })


          $.ajax({
              url: '/APIcod',
              data: {user:username, plataforma:valid},
              type: 'POST',
              success: function(res){
                  if (res['error']){
                      console.log(res);
                      document.querySelector('.loadStats').style.display = 'block';
                      document.querySelector('.loadStats2').style.display = 'none';
                      document.querySelectorAll('.spinEachCard').forEach(function(e){
                          e.style.display = 'none';
                      })

                  }
                  if(!res['error']){
                      document.querySelector('.loadStats').style.display = 'block';
                      document.querySelector('.loadStats2').style.display = 'none';
                      document.querySelectorAll('.spinEachCard').forEach(function(e){
                          e.style.display = 'none';
                      })

                      //username
                      document.getElementById('userResp').innerHTML = res['player_stats']['username'];

                      // games / partidas
                      document.getElementById('gamesPlayed').innerHTML = res['player_stats']['games']
                      document.getElementById('topGAMES').innerHTML = 'top '+ res['player_top']['games'] + "%" ;
                      document.getElementById('barGames').style.width = res['player_top']['games'] + "%" ;

                      // kd
                      document.getElementById('kd').innerHTML = parseFloat(res['player_stats']['kd']);
                      document.getElementById('topKD').innerHTML = 'top '+ res['player_top']['kd']  + "%";
                      document.getElementById('barKD').style.width = res['player_top']['kd']  + "%";


                      // kills
                      document.getElementById('kills').innerHTML = res['player_stats']['kills'];
                      document.getElementById('topKills').innerHTML = 'top '+ res['player_top']['kills'] + "%" ;
                      document.getElementById('barKills').style.width =res['player_top']['kills'] + "%" ;

                      // kg
                      document.getElementById('KG').innerHTML = res['player_stats']['kg'];
                      document.getElementById('topKG').innerHTML = 'top '+ res['player_top']['kg'] + "%" ;
                      document.getElementById('barKG').style.width = res['player_top']['kg'] + "%" ;

                      // level
                      document.getElementById('level').innerHTML = res['player_stats']['level'];
                      document.getElementById('topLEVEL').innerHTML = 'top '+ res['player_top']['level'] + "%" ;
                      document.getElementById('barLevel').style.width = res['player_top']['level'] + "%" ;

                      //wins
                      document.getElementById('wins').innerHTML = res['player_stats']['wins'];
                      document.getElementById('topWIN').innerHTML = 'top '+ res['player_top']['wins'] + "%" ;
                      document.getElementById('barWins').style.width = res['player_top']['wins'] + "%" ;

                      //deaths
                      document.getElementById('deaths').innerHTML = res['player_stats']['deaths'];
                      document.getElementById('topDeaths').innerHTML = 'top '+ res['player_top']['deaths'] + "%" ;
                      document.getElementById('barDeaths').style.width = res['player_top']['deaths'] + "%" ;

                      //revives
                      document.getElementById('revives').innerHTML = res['player_stats']['revives']
                      document.getElementById('topRV').innerHTML = 'top '+ res['player_top']['revives'] + "%" ;
                      document.getElementById('barRV').style.width = res['player_top']['revives'] + "%" ;

                      //avg
                      var AVGtempo = res['player_stats']['avg']
                      if (AVGtempo < 60){
                          document.getElementById('avg').innerHTML =res['player_stats']['avg'] + 'min';
                      }
                      if (AVGtempo > 60){
                          document.getElementById('avg').innerHTML = Math.round(res['player_stats']['avg']/60) + 'hr';
                      }
                      document.getElementById('topAVG').innerHTML = 'top '+ res['player_top']['avg'] + "%";
                      document.getElementById('barAVG').style.width = res['player_top']['avg'] + "%";

                      //timePlayed
                      var tempo = res['player_stats']['timePlayed']
                      if (tempo < 3600){
                          document.getElementById('timePlayed').innerHTML = res['player_stats']['timePlayed']+' min'
                      }

                      if (tempo > 3600){
                          document.getElementById('timePlayed').innerHTML = Math.round(res['player_stats']['timePlayed']/60)+' hr'
                      }
                      document.getElementById('topTIME').innerHTML = 'top '+ res['player_top']['timePlayed'] + "%" ;
                      document.getElementById('barTime').style.width = res['player_top']['timePlayed'] + "%" ;

                      //score
                      document.getElementById('score').innerHTML = res['player_stats']['score']
                      document.getElementById('topScore').innerHTML = 'top '+ res['player_top']['score'] + "%" ;
                      document.getElementById('barScore').style.width = res['player_top']['score'] + "%" ;


                      //win ratio
                      document.getElementById('winRatio').innerHTML = res['player_stats']['win_ratio']+ "%";
                      document.getElementById('topWinRatio').innerHTML = 'top '+ res['player_top']['win_ratio'] + "%" ;
                      document.getElementById('barWinRatio').style.width = res['player_top']['win_ratio'] + "%" ;

                      SetBarColor();

                    }
                },
              error: function(error){
                  console.log(error);
                }
            });

        }

    }

    function SetBarColor() {
        document.querySelectorAll('.barColor').forEach(function(e){
            var wid = parseFloat(e.style.width);

            if (wid >= 85){
                e.classList.add('redBar');
              }

            if (wid > 50 && wid < 85) {
                e.classList.add('orangeBar');
              }

            if (wid > 25 && wid < 50) {
                e.classList.add('yellowBar');
              }


            if (wid > 10 && wid < 25) {
                e.classList.add('quaseVerdeBar');
              }


            if (wid > 0 && wid < 10) {
                e.classList.add('greenBar');
              }
          });
      }