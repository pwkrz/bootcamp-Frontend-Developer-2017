# AJAX polyfill for the fetch() function

**Assignment**

+ Write a polyfill for the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function.
+ Use the **XMLHttpRequest** object so that the resulting function works like this:
```
fetch(*URL string*, function(data) {
        console.log("Success");
        console.log(data);
    }, function(error) {
        console.log("Error occurred!");
        console.log(error);
});
```