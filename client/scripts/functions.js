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

function fetchSongs(mood){
  $.ajax({
      method: "GET",
      url: `http://localhost:3000/songs/${mood}`,
      success: function(data){
          console.log(data)
      }
  })
  .done((data) => { console.log('sukses fetch songs')})
  .fail(err => { console.log('gagal fetch songs')})
}