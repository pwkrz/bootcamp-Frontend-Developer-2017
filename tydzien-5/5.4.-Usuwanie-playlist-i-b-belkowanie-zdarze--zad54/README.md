# Deleting playlists and bubbling events

+ Add a delete button to each playlist list item. You can use the `&times;` symbol
which will display the "X" in HTML.
+ Clicking the delete button should delete the playlist from the playlist list
+ Clicking on the list item should still select a list for editing.
+ Tip: As you will see, use of Angular does not absolve you from the knowledge of DOM and Javascript. When using events in Angular, we really use browser events. Remember about `event.preventDefault()`?