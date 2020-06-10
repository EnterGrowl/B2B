$( document ).ready(function() {
	$('.navguide').off().on('click', function() {
		$('#' + $(this).attr('id').replace('i', '')).click()
	})

	$('#contact').off().on('click', function() {
		let data = JSON.stringify({
			name: $('#name').val()||'nonce',
			email: $('#email').val()||'nonce',
			message: $('#message').val()||'nonce'
		  })
		console.log(data)
		$.ajax({
		  type: 'POST',
		  url: '/contact',
		  data: data,
		  contentType: 'application/json',
		  success: function(data){
		    alert('Thanks for reaching out! We\'ll get back to you shortly.')
			$('#name').val('')
			$('#email').val('')
			$('#message').val('')
		  },
		  error: function(xhr, type){
		    alert('Sorry! There was a problem sending your message.')
		  }
		})
	})
})