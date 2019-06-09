let currentPage = 1;
function loadCandidates(){
    let candCount = 1;
    let pageLocation = location.pathname.substring(16);
    let candType = (pageLocation == "c-suite-executive-candidate/") ? 23 : 22;
    $.getJSON(`/wp-json/wp/v2/candidate?candidate_type=${candType}&per_page=5&page=${currentPage}`, (result)=>{
        result.forEach((candidate)=>{
            console.log('candidate number:' + candCount)
            candCount += 1;
            console.log(candidate);
            $(`<div class="candidateListing" id="candListing${candCount}"></div>`).appendTo($('#profileListPage'));

                $(`<div class="candidateImage" id="candImage${candCount}"></div>`).appendTo($(`#candListing${candCount}`));
                    let photoLink = candidate.acf.qd_photo;
                    $(`<img src="${photoLink}" />`).appendTo($(`#candImage${candCount}`));
                        console.log(`in this loop`);

                $(`<div class="candidateText" id="candText${candCount}"></div>`).appendTo($(`#candListing${candCount}`));
                    $(`<h1 class="candidateName"><a href="${candidate.link}">${candidate.title.rendered}</a></h1>`).appendTo($(`#candText${candCount}`));

                $(`<h2 class="candidateTitle">${candidate.acf.qd_title}</h2>`).appendTo($(`#candListing${candCount}`));

                $(`<p><strong>Industries:</strong>${candidate.acf.qd_industries}</p>`).appendTo($(`#candListing${candCount}`));

                $(`<p><strong>Functional Expertise:</strong>${candidate.acf.qd_domain_expertise}</p>`).appendTo($(`#candListing${candCount}`));
            
            $('<hr/>').appendTo($('#profileListPage'));
            
        });
    });
}
function checkButtons(){
    let pageLocation = location.pathname.substring(16);
    if (pageLocation == "c-suite-executive-candidate/") {
        if (currentPage == 1)
            $('#prevPage').attr('style','display:none;');
        else 
            $('#prevPage').attr('style','');
        if (currentPage == 3)
            $('#nextPage').attr('style','display:none;');
        else 
            $('#nextPage').attr('style','');
    } else {
        if (currentPage == 1)
            $('#prevPage').attr('style','display:none;');
        else 
            $('#prevPage').attr('style','');
        if (currentPage == 3)
            $('#nextPage').attr('style','display:none;');
        else 
            $('#nextPage').attr('style','');
    }
}
loadCandidates();
$(`<a href='' id='prevPage'>Previous   </a>`).appendTo($('.entry-content'));
$('#prevPage').click((e)=>{
    e.preventDefault();
    currentPage -= 1;
    checkButtons();
    $('.candidateListing').remove();
    $('hr').remove();
    loadCandidates();
})
$(`<a href='' id='nextPage'>Next</a>`).appendTo($('.entry-content'));
$('#nextPage').click((e)=>{
    e.preventDefault();
    currentPage += 1;
    checkButtons();
    $('.candidateListing').remove();
    $('hr').remove();
    loadCandidates();
})
checkButtons();