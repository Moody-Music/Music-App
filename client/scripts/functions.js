function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
      method: "POST",
      url: `http://localhost:3000/google-signin`,
      data: { id_token },
      success: function(data){
          localStorage.setItem("token", data.access_token)
          localStorage.setItem("email", data.email)
          $("#emailname").text(localStorage.email)
          $(".app").hide()
          home();
      }
  })
  .done((data) => {console.log('sukses login Google')})
  .fail( err => { console.log('gagal register')})
}

function changeAudio(source){
  $('#sourceAudio').attr('src', source)
  $('audio')[0].pause()
  $('audio')[0].load()
  $('audio')[0].oncanplaythrough = $('audio')[0].play();
}

function fetchGIFs(mood){
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/giphy/${mood}`
  })
  .done((data) => {
    console.log('masuk giphy')
    $("#giphy").attr('src', data.gifs[0].embed_url)
  })
  .fail(err => {
    console.log(err)
  })
}

function fetchSongs(mood){
  $.ajax({
      method: "GET",
      url: `http://localhost:3000/songs/${mood}`
  })
  .done((data) => { 
    //   console.log('sukses fetch songs=======', data)
        fetchGIFs(mood)
        $('#sourceAudio').attr('src', data.songs[0].preview)
        $('audio')[0].pause()
        $('audio')[0].load()
        $('#songlist').empty()
        for (let i = 0; i < data.songs.length; i++) {
            let temp = `<a onclick="changeAudio('${data.songs[i].preview}')" class="list-group-item list-group-item-action list-group-item-warning flex-column align-items-start box">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${data.songs[i].title}</h5>
                        <small><button class="btn btn-sm btn-light viewlyrics" onclick="viewLyrics('${JSON.stringify(data.songs[i].lyrics).replace(/['"]+/g, '')}')">View Lyrics</button></small>
                        </div>
                        <p class="mb-1">${data.songs[i].artist}</p>
                        </a>
                        `
            $('#songlist').append(temp)
        }
    })
    .fail(err => { console.log('gagal fetch songs')})
}

function viewLyrics(lyrics){
    console.log('MASUKK NIH')
    Swal.fire({
        title: "<h2>Let's sing!</h2>",
        html: lyrics,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
    })
}
