# Tealium

This library is for Tealium javascript extensions and helps us to support a better version control and enables code linting.

## Usage Guide

### IDE

This repo allows to edit the js code in a proper IDE like VSCode/WebStorm/IntelliJ and get benefits like syntax error highlighting, linting and code formatting. Additionally we can make PRs of sensitive changes and let them review by colleagues.

Setup an **ESLint plugin** for your IDE to see errors right in your editor. Don't forget to install ESLint by executing `npm install`.

### Add new extension

1. Insert new javascript-extension in tealium.
2. Create new file in the repository and push it to the remote repository.
3. When you open the extension in tealium there is a button "Add" near to GITHUB Files. Add the full repository link to that e.g. (https://github.com/willhaben/tealium/blob/master/js/926_SPT-general.js)
4. It needs to be manually be synced every time you pushed something to the github repository

## Problems

### 1. Template code like `##UTGEN##` and `##UTEXTEND##` causes syntax errors, breaking linting and formatting

The suggestion is to _temporally_ comment out these lines, but keep that only as a local change and **never commit the chages to these lines**. This needs support from the git tool, stage/commit either via command line, or with tools supporting to stage hunks/lines like SourceTree.

### 2. Some very long lines like the code after "Start Tealium loader 4.32" might not be wanted to be formatted into multiple lines

The solution is similar to 1.: Comment the line out temporarily but do not commit the change to this line.

## Why we keep the code in this repo / Problems with Editing Code in Tealium

Editing directly in Tealium is problematic:

-   No proper change tracking
    -   No proper diff
    -   No way to discuss code changes in form of a PR
    -   If someone breaks a js tag template or extension, we cannot restore the old code easily
-   Changes directly go live and might break stuff
    -   No syntax highlighting and linting when using illegal js code, or not ES5 compatible code
    -   The code runs directly in the browser, therefore any syntax errors will break ALL tagging on ALL our platforms (since all platforms load the same utag.js)
    -   IE5 is only compatible with ES5
