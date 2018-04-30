# Dynamic @Input and setters

In JavaScript, you can define the field of the object as a function. These are so-called
getters and setters.

+ Use a setter instead of a class field in such a way that each time a new playlist is sent to the form component via `@Input('playlist')` a method is called that creates a copy of the playlist (using `Object.assign({})`).
+ Owing to this, editing the playlist fields will not change the original version of the playlists.
+ Clicking the save button should send the modified playlist to the parent component, which should update the corresponding item in the list.
+ Hint: use `@Output()` and `EventEmitter`. You can add an "id" field to playlists to make it easier to find the right item on the list.