(function($) {
 console.log(red_vars)
$('#btn').click( function(){
$.ajax({
  url:red_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[postperpage]=1'
}
).done(function (data) {
  $('#quotes').innerHTML=" ";
  console.log(data)
  const title =data[0].title.rendered;
  const content =data[0].content.rendered;
  const link =data[0].link;
  const source=data[0]._qod_quote_source;
  const sourceURL=data[0]._qod_quote_source_url;
  if ( source ) {
    

  const html= ` <p><a class="front-quotes" href='${link}'>${content}</a></p>` + `${title}`+`,<a  href='${sourceURL}'>${source}</a>`
     $('#quotes').html(html)
  } else {
  const html= ` <p><a class="front-quotes" href='${link}'>${content}</a></p>` + `${title}`
    $('#quotes').html(html) 
  }
 
  window.history.pushState({page: "another"}, "another page", data[0].slug); 
}

)
});
 const submit = $('.wpcf7-form')
 submit.on('submit', function (e) {
  e.preventDefault();
  $.ajax({
      url:red_vars.rest_url + '/wp/v2/posts',
      type: 'POST',
      data : {
        'title' : $('input[name="your-name"]').val() ,
        'content' : $('input[name="your-quote"]').val() ,
        '_qod_quote_source' : $('input[name="your-subject"]').val() ,
        '_qod_quote_source_url' : $('input[name="quote-source-url"]').val() ,
     
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-WP-Nonce", red_vars.wpapi_nonce);
      }
  }).done(function(data) {
      alert("success");
  }).fail(function(data) {
      alert("fail");
  })
});




})(jQuery);


