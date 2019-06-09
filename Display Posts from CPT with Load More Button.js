let start = 0;
let end = 5;
let maxNewsPosts = 100;

$('<div id="newsPosts"></div>').appendTo($('.about-body'));
$('<div id="buttonDiv"></div>').appendTo($('.about-body'));

function loadPosts(start, end){
    $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("Authorization","Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmFzY2VuZGllbnQuY29tIiwiaWF0IjoxNTU5NzU5NzE5LCJuYmYiOjE1NTk3NTk3MTksImV4cCI6MTU2MDM2NDUxOSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTEifX19.edqXKOhEHRomRxKbzrnPBpy5UgoZWgbqvQ_Lzu0Ft-c");
        },
        dataType: "json",
        url: "/wp-json/wp/v2/pages/2176",
        success: function(page){
            $('#loadMoreBtn').attr('style', '');
            let newsPosts = page.acf.news_posts;
            maxNewsPosts = newsPosts.length;
            if (end > maxNewsPosts)
                end = maxNewsPosts;
            for (let i=start; i<end; i++){
                let newsPost = newsPosts[i];
                console.log(newsPost);
                $(`<a href=${newsPost.link}">${newsPost.title}</a>`).appendTo($('#newsPosts'));
                $('<br/>').appendTo($('#newsPosts'));
                $(`${newsPost.description}`).appendTo($('#newsPosts'));
            }
            if (end==maxNewsPosts){
                $('#loadMoreBtn').attr('style', 'display:none;');
            }
        } 
    })
}
$(`<a style="display:none;" href="" id="loadMoreBtn" class="btn btn-default btn-orange">Load More</a>`).appendTo($('#buttonDiv'));
$('#loadMoreBtn').click( (e) => {
    e.preventDefault();
    if(end == maxNewsPosts){
        $('#loadMoreBtn').attr('style', 'display:none;');
    } else {
        loadPosts(start += 5, end += 5);
    }
});
loadPosts(start, end);