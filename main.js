// listen for submit
document.getElementById("myForm").addEventListener('submit', saveBookmark);

// save bookmarks
function saveBookmark(e) {
  // get form values
  var siteName = document.getElementById("siteName").value;
  var siteURL = document.getElementById("siteURL").value;

  if(!validateForm(siteName, siteURL)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL
  }

  // // local storage test
  // localStorage.setItem('test', 'hello world');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  if(localStorage.getItem('bookmarks') === null){
    // init array
    var bookmarks = [];

    // add to array
    bookmarks.push(bookmark);

    // set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // get bookmark form local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    // add bookmark to array
    bookmarks.push(bookmark)
    // re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // reset the form
  document.getElementById('myForm').reset();
  // re-fetch bookmarks
  fetchBookmarks();

  // console.log(bookmark);
  e.preventDefault();
}

function deleteBookmark(url){
  // get bookmark from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  // loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // remove from array
      bookmarks.splice(i, 1);
    }
  }
  // re-set back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // re-fetch bookmarks
  fetchBookmarks();
}

function fetchBookmarks(){
  // get bookmark form local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  // console.log(bookmarks)
  // get output id
  var bookmarksResults = document.getElementById('bookmarksResults')
  // build output
  bookmarksResults.innerHTML = '';

  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
     '<div class="well">'+
     '<h3>'+name+
     '  <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
     '  <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
     '</h3>'+
     '</div>';
  }
}

function validateForm(siteName, siteURL){
  if(!siteName || !siteURL){
    alert('Please fill in the form')
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  
  if(!siteURL.match(regex)){
    alert('Please enter a valid URL')
    return false;
  }

  return true;
}