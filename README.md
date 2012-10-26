## [PureMVC](http://puremvc.github.com/) [Dart](https://github.com/PureMVC/puremvc-dart-multicore-framework/wiki) Demo - Reverse Text
This simple demo shows the most common actors and collaborations found in a PureMVC application. A form allows you to enter text, click a button and have the text reversed and displayed in another text box. A check box allows you to have your text reversed continuously as you type. Finally, when the text in the input box is the same as the text after reversal, the output text box's label changes to indicate that a palindrome was detected.

* [Live Demo](http://darkstar.puremvc.org/content_header.html?url=http://puremvc.org/pages/demos/Dart/Demo_Dart_ReverseText/&desc=PureMVC%20Dart%20Demo:%20Reverse%20Text)
* [Discussion](http://forums.puremvc.org/index.php?topic=2009.0)

## Screenshot
![PureMVC Dart Demo: Reverse Text](http://puremvc.org/pages/images/screenshots/PureMVC-Shot-Dart-ReverseText.png)

## Status
Production - [Version 2.0](https://github.com/PureMVC/puremvc-dart-demo-reversetext/blob/master/VERSION)

## Platforms / Technologies
* [Google Dart](http://www.dartlang.org)
* JavaScript, DOM
* [Bootstrap Base CSS](http://twitter.github.com/bootstrap/base-css.html)

## Features 
Keep in mind that this demo is not about achieving the smallest amount of code, but rather to demonstrate the classes, responsibilities, and collaboration patterns that are typically used in a PureMVC-based application of any size.

Demonstrated are how to...
* Use a Facade instance to initialize and startup a PureMVC core.
Prepare the Model, View, and Controller regions of the PureMVC core using a MacroCommand and SimpleCommands.
* Use a Mediator to forward user input from view components on to other parts of a PureMVC core for processing.
* Use business logic in a SimpleCommand that both updates data in a Proxy and conditionally notifies an Mediator with information about the process.
Store data in an Proxy, and have the Proxy notify the rest of the core when that data is changed.
Have an Mediator show interest in certain Notifications and handle them by updating its view component.
* Internet Explorer is not supported by this demo. In order to bring you a demo that shows only PureMVC and the DOM with no other interference or abstractions, we decided to support only on W3C compliant browsers.
Twitter's Bootstrap is used only for its Base CSS, to make it look pretty.

## License
* PureMVC Reverse Text Demo for JavaScript - Copyright © 2012 David Foley, 
* PureMVC Reverse Text Demo ported to Dart - Copyright © 2012 Cliff Hall
* PureMVC Framework - Copyright © 2006-2012 Futurescale, Inc.
All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.