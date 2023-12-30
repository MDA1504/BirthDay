$(document).ready(function () {
    // Define an array of background image URLs corresponding to each song
    var bgImages = [
        'url(s8.jpg)',
        'url(s2.jpg)',
        'url(s3.jpg)',
        'url(s4.jpg)',
        'url(s5.jpg)',
        'url(s6.jpg)',
        'url(s7.jpg)',
    ];

    // Get all the song items
    var songItems = $('.songItem');
    var audio = new Audio();

    songItems.click(function () {
        var songIndex = $(this).index(".songItem");
        var songPath = "songs/" + (songIndex + 1) + ".mp3";

        // Store the reference to the clicked element
        var clickedSongItem = $(this);

        // Pause the current audio and reset its time
        audio.pause();
        audio.currentTime = 0;

        // Set the new source for the existing audio element
        audio.src = songPath;
        audio.load(); // Reload to ensure the new source is applied
        audio.addEventListener("loadedmetadata", function () {
            $(".inputt>input").attr("max", audio.duration);

            // Display total duration
            $(".total-duration").text(formatTime(audio.duration));

            // Use the stored reference to the clicked element
            // clickedSongItem.find("i").addClass("fa-spin");

            // Get the song name from the clicked element and update h1
            var songName = clickedSongItem.find(".spann").text();
            $("h1").text(songName);

            // Set the background image based on the clicked song
            $('.container').css({
                'background-image': bgImages[songIndex],
                'background-size': '50% 100%',
                'background-position': 'right',
                'background-repeat': 'no-repeat', // Corrected property name and set to 'no-repeat'
            });
            
        });
        makesound();
    });

    $("#master").click(function () {
        makesound();
    });

    function makesound() {
        if (audio.paused || audio.currentTime <= 0) {
            audio.play();
            $("#master").removeClass("fa-play");
            $("#master").addClass("fa-pause");
            $(".gif img").css("opacity", "1");
        } else {
            audio.pause();
            $("#master").removeClass("fa-pause");
            $("#master").addClass("fa-play");
            $(".gif img").css("opacity", "0");
        }
    }

    audio.addEventListener("timeupdate", function () {
        var progress = audio.currentTime;
        $(".inputt>input").val(progress);

        // Display current time
        $(".current-time").text(formatTime(progress));
    });

    $(".inputt>input").on("input", function () {
        audio.currentTime = parseFloat($(".inputt>input").val());
    });

    // Function to format time in MM:SS
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = Math.floor(seconds % 60);
        return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
    }
});
