let response = '';

jQuery.ajax({
url: '/wp-json/wp/v2/posts?_embed&per_page=100',
dataType: 'json',
async: false
}).done( (theResponse) =>{
response = theResponse;
});

let blogCount = response.length;

function loadPosts(start, end){

jQuery('.blogs').html('');

if (end > blogCount) {
    end = blogCount;
}

for (let i=start; i<end; i++){
            
    let blogs = jQuery('.blogs');
    let blog = response[i];

    let article = jQuery(`<article class="blog" id="post-${blog.id}"></div>`);
    article.appendTo(blogs);

    let header = jQuery(`<header class="entry-header post-${blog.id}"></header>`);
    header.appendTo(jQuery(`#post-${blog.id}`));

    jQuery(`<h2 class="entry-title post-${blog.id}"><a href="${blog.link}" rel="bookmark">${blog.title.rendered}</a></h2>`).appendTo(article);

    let theDate = String(new Date(blog.date).toDateString()).substring(4);

    jQuery(`<div class="entry-meta datentime"><span class="byline"> <span class="author vcard"><a class="url fn n" href="${blog._embedded["author"][0].link}">${blog._embedded["author"][0].name}</a></span></span><span class="blog-divider">  |  </span><span class="posted-on"><span class="screen-reader-text"></span> <a href="${blog.link}" rel="bookmark"><time class="entry-date published updated">${theDate}</time></a></span></div>`).appendTo(article);
    

    if(blog._embedded["wp:featuredmedia"][0].source_url != ""){

    let featuredImage = `<img src="${blog._embedded["wp:featuredmedia"][0].source_url}" class="attachment-twentyseventeen-featured-image size-twentyseventeen-featured-image wp-post-image" alt="" sizes="(max-width: 5000px) 100vw, 5000px">`;

    jQuery(`<div class="post-thumbnail"><a href="${blog.link}">${featuredImage}</a></div>`).appendTo(article);

    }
    
    let text = jQuery(blog.content.rendered).text().substring(0,265);
    let content = `<p>${text}... <a href="${blog.link}">Read More</a></p>`;
    jQuery(`<div class="entry-content">${content}</div>`).appendTo(article);

}

}
        
jQuery('<a href="#" id="prevBtn" style="display:none;">Prev</a>').appendTo(jQuery('.body-txt:not(.insightsCustom)'));
jQuery('<a href="#" id="nextBtn">Next</a>').appendTo(jQuery('.body-txt:not(.insightsCustom)'));

let currentPage = 1;

let start = 0;
let end = 3;
loadPosts(start, end);

jQuery("#nextBtn:not(.insightsCustom)").click(function(e){
e.preventDefault();
start += 3;
end += 3;
loadPosts(start, end);
jQuery("html, body").animate({ scrollTop: 0 }, "slow");
if(start + 3 >= blogCount){
    jQuery("#nextBtn").attr('style','display:none;');
} else {
    jQuery("#nextBtn").attr('style','');
}
jQuery("#prevBtn").attr('style','');
})

jQuery("#prevBtn:not(.insightsCustom)").click(function(e){
e.preventDefault();
start -= 3;
end -= 3;
loadPosts(start, end);
jQuery("html, body").animate({ scrollTop: 0 }, "slow");
if(start == 0){
    jQuery("#prevBtn").attr('style','display:none;');
} else {
    jQuery("#prevBtn").attr('style','');
}
if(start - 3 <= blogCount){
    jQuery("#nextBtn").attr('style','');
}
})
