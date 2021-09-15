const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));

}

const displaySearchResult = books => {
    // Count total
    const total = books.length;
    const totalCount = document.getElementById('total-count');
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // show limited post 
    if (total !== 0) {
        
        books.slice(0, 30).forEach(book => {
            totalCount.innerHTML = `
                <h3>Showing ${books.slice(0, 30).length} of Total ${total} results</h3>    
                <hr>
                <hr>
            `;
            let coverUrl;
            // validation check for cover image 
            if (book.cover_i !== undefined) {
                coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            } else {
                coverUrl = 'images/NoImageFound.png';
            }
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="col shadow-lg p-3"> 
                <div class="card border border-success border-2">
                    <img height="250px" src="${coverUrl}" class="card-img-top" alt="..."> 
                    <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <p class="card-text fw-bold">Author: <span class="text-success"> ${book.author_name} </span></p>
                    <p class="card-text"> Publisher: ${book?.publisher?.[0]} </p> 
                    <p class="card-text"><small class="text-muted"> First publishing year: ${book.first_publish_year}</small></p>
                  </div>
                </div>
            </div>
            `;
            searchResult.appendChild(div);

        });
    }
    else {
        totalCount.innerHTML = `
        <h3>No results found!</h3>    
        <hr>
        <hr>
        `;
    }

}