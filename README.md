nInputDefault.js
================

nInputDefault.js is a small jQuery plugin to add placeholder functionality on text input fields
and text areas in browsers without native support for it. It also adds an extra class to the elements on the focus event. Default classname is "focus", but is changeable by the developer. This functionality also works on browsers with native support, for easy styling.

Usage
-----
Include the script after you've loaded jQuery:

    <script src="./nInputDefault-<version>.min.js"></script>

Add the placeholder attribute with the default text you want on your page:

    <input type="text" placeholder="Enter search term..." name="search" />

or to text areas:

    <textarea name="comments" placeholder="Please enter your comments:"></textarea>

Start the actual plugin by calling `nInputDefault();` on the selector your want it. To add it to all text input fields and textareas, try this:

    $('input,textarea').nInputDefault();

The script will automatically only bind itself to inputs of type text.

To supply your own classname for the focus event, use

    $(selector).nInputDefault({focusClassName : 'myFocusClass'});

That's pretty much it, hope someone has use for it!

Let me know if you find any bugs, or want additional functionality built in.
