# How and Why AMD is Right for Me (and Probably For You Too)

Even though it's considered to be the "lingua franca" of the web, JavaScript was not originally intended to support the type of rich web applications front-end developers have been tasked with engineering over the past few years.  Today, it is not uncommon to see web apps comprise many thousands of lines of code.  Trying to organize a codebase of that size within a single file is both nearly impossible and downright silly; if this was the only way of doing things I would've quit web development all together.  

During this tutorial, I will attempt to convince you that the Asynchronous Module Definition (**AMD**) pattern is a necessary and sufficient solution to the problems of dependency management on the web.

## Old and Busted

### Naiive Splitting of Your JS into Multiple Files

The logical first step in the evolution of code organization in the browser was to split your functions and procedural code into a bunch of files containing related functionality.  Even this type of "structure" is not sustainable beyond a few hundred lines of code, you'll quickly realize that managing dependencies and avoiding naming collisions across the collection of files becomes a nightmare.  Imagine a situation where your application is tasked with retrieving information from a REST service and you've written the following:

```javascript
function getData(args, callback){
    // set up an AJAX request to some URL with the arguments, which calls back 
    // to the specified callback.
}
``` 

This looks ok, but what if another feature creeps into the application which involves another AJAX request, and you're not the developer who gets tasked with implementing it, it's possible that another `<script>` tag will be included on the page which also defines a function called `getData`.  If your original code only executes after the DOM is ready, it might call the version of `getData` defined by the other developer (depending on whether or not your script is included onto the page before or after the other developer's) - **BUG ALERT!**  This is called a namespace collision and is just the first issue you will run into when developing your app as a collection of bare JS files.  It can also be a potential security issue, as someone running Firebug on Firefox or the Developer Tools available to Webkit users can inject their own version of `getData` into the global scope.
    
### Ensapsulating Your Files' Contents with an Immediately Invoked Function Expression (IIFE)

In the previous section I showed you an example of why exposing your functionality directly to the global scope (which is what happens without taking precautions, even if you separate your JS into multiple files) can come back and bite you in the ass. The next step in the evolution of JavaScript code organization came with using what's known as an [Immediately Invoked Function Expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) (or IIFE) to hide your script's function and variable definitions within a closure and to not pollute the global scope.  An example of an IFFE is this:

```javascript
(function(){
    
    // Any functions or variables declared in here will be invisible to the 
    // global scope!
    
})();
```

So, if we refactor our previous example into a system which uses IIFEs to encapsulate functionality for the two separate scripts we won't run into the namespace collision of the `getData` functions anymore. Great!? Almost.  

What if the two files also share a lot of common functionality that we think would make sense to turn into a shared toolset?  Without some creative solutions (read: AMD - we're getting to it, I promise) we'll *need* to expose that common functionality to the global scope so that the code within the other scripts can make use of it. However, we'll still run into problems with security because as with the previous section's approach: the globally-exposed functionality can be [monkey-patched](http://en.wikipedia.org/wiki/Monkey_patch) by an enterprising hacker to cause all kinds of interesting and horrible side effects.

### Other Issues With Large Applications Using Either Old And Busted Method

Aside from the security and readability issues pointed out in the previous two sections, any large application will likely involve tens or even hundreds of individual JavaScript files.  In order for any JavaScript to be executed in the browser, it has to be included onto the page somehow. The naiive approach to including a hundred JavaScript files is to include a hundred `<script>` tags.  You'll have two very significant problems with this approach, however:
    
1. Each script must be loaded by the browser, involving a separate blocking HTTP request (this can be slow for lots of files)
2. You must figure out a correct order in which to write your `<script>` tags so that each files' dependencies are already loaded before it gets loaded itself - this is especially important if you're writing object-oriented JavaScript and one of your classes extends another class in another file.
    
The first problem can be solved by writing a build script for your application using tools like [Ant](http://ant.apache.org/) and [JSMin](http://www.crockford.com/javascript/jsmin.html).

## New Hotness: Asynchronous Module Definition (AMD)

According to the [official spec](https://github.com/amdjs/amdjs-api/wiki/AMD):

> The Asynchronous Module Definition (**AMD**) API specifies a mechanism for 
> defining modules such that the module and its dependencies can be 
> asynchronously loaded. This is particularly well suited for the browser 
> environment where synchronous loading of modules incurs performance, 
> usability, debugging, and cross-domain access problems.

[RequireJS](http://requirejs.org) is the most widely-used implementation of AMD, and it is what we'll use throughout the rest of this tutorial. To quote from the RequireJS site's ["Why AMD?"](http://requirejs.org/docs/whyamd.html) article:

> The AMD format comes from wanting a module format that was better than 
> today's "write a bunch of script tags with implicit dependencies that you 
> have to manually order" and something that was easy to use directly in the 
> browser. Something with good debugging characteristics that did not require 
> server-specific tooling to get started. It grew out of Dojo's real world 
> experience with using XHR+eval and and wanting to avoid its weaknesses for 
> the future.
> 
> It is an improvement over the web's current "globals and script tags" 
> because:
>
> * Uses the [CommonJS](http://groups.google.com/group/commonjs) practice of 
>   string IDs for dependencies. Clear declaration of dependencies and avoids 
>   the use of globals.
>
> * IDs can be mapped to different paths. This allows swapping out 
>   implementation. This is great for creating mocks for unit testing. 
>
> * Encapsulates the module definition. Gives you the tools to avoid polluting 
>   the global namespace.
>
> * Clear path to defining the module value. Either use "return value;" or the 
>   CommonJS "exports" idiom, which can be useful for circular dependencies.

### Getting Started With RequireJS and jQuery

 * Download RequireJS from http://www.requirejs.org
 * Download jQuery from http://www.jquery.com

#### Hello World

```javascript
<!doctype html>
<html>
    <body>
        <h1>Hello <span class="name"></span></h1>

        <script type="text/javascript">
            var require = {
                paths: {
                    'jquery': 'path/to/jquery' // leave off the .js
                }
            };
        </script>
        <script src="path/to/require.js" type="text/javascript"></script>
        <script type="text/javascript">
            require(['jquery'], function($){
                $(function(){
                    var name = prompt("What is your name?");
                    
                    $('.name').text(name);
                });
            });
        </script>
    </body>
</html>
```

#### Defining and Requiring Your Own Modules

*TODO*

#### Deeper Dependency Management and Object-Oriented JavaScript with Ancestry.js

*TODO*

### Other Interesting Functionality of RequireJS

*TODO*

#### Plugins

*TODO*

#### Building

*TODO*


