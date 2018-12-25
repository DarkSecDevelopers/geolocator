$('button').on('click', function(e) {
    var t = $('span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(show3WordAddress, showError);
        t.text('Loading...');
    } else {
        t.text('Geolocation is not supported by this browser.');
    }

    function show3WordAddress(location) {
        data = {
            key: 'Your-API-key-here',
            coords: location.coords.latitude + ',' + location.coords.longitude
        };

        $.ajax({
            url: 'https://api.what3words.com/v2/reverse',
            type: 'get',
            data: data,
            success: function(response) {
              var output = response.words;
              window.location = "result.php?c=" + output;
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                t.text(err.message);
            }
        });
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                t.text('User denied the request for Geolocation.');
                break;
            case error.POSITION_UNAVAILABLE:
                t.text('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                t.text('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                t.text('An unknown error occurred.');
                break;
        }
    }
});
