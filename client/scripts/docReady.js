const baseUrl = 'http://localhost:3000';

$(document).ready(function(){
  home();

  $('#login-form').submit(function(event){
    event.preventDefault();
    console.log('mashooooook');
    let email= $('#email-login').val();
    let password = $('#password-login').val(); 
    $.ajax({
      method: 'POST',
      url: baseUrl + '/login',
      data:{
        email, password
      }
    })
      .done(data=>{
        console.log(data);
        localStorage.setItem('token', data.token);
        home();
      })
      .fail(err=>{
        console.log(err)
      })    
  })

  $('#register-form').submit(function(event){
    event.preventDefault();
    console.log('register niich');
    $('#register').show()
    let email= $('#email-register').val();
    let password = $('#password-register').val(); 
    $.ajax({
      method: 'POST',
      url: baseUrl + '/register',
      data: { email, password }
    })
      .done(data=>{
        console.log(data)
        home();
      })
      .fail(err=>{
        console.log(err)
      })    
  })
})

function auth(){
  if(localStorage.length==0){
    $('.app').hide();
    $('#login').show();
  } else {
    $('.app').hide();
    $('#btn-logout').show();
  }
}

$('#btn-gotoregister').click(function(e){
  e.preventDefault();
  $(".app").hide(500);
  $("#register").show(500);
});

$('#btn-gotologin').click(function(e){
  e.preventDefault();
  $(".app").hide(500);
  $("#login").show(500);
});

$('#btn-logout').click(function(e){
  e.preventDefault();
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  });
  localStorage.clear();
  $(".app").hide(500);
  $("#login").show(500);
});

function home(){
  auth();
}