# Willhaben Tealium Scripts

This repo mirrors some js scripts we use in our Tealium instance in order to allow for a PR workflow and code linting.

## Problems with Editing Code in Tealium

Editing directly in Tealium is problematic:

-   No proper change tracking
    -   No proper diff
    -   No way to discuss code changes in form of a PR
    -   If someone breaks a js tag template or extension, we cannot restore the old code easily
-   Changes directly go live and might break stuff
    -   No syntax highlighting and linting when using illegal js code, or not ES5 compatible code
    -   The code runs directly in the browser, therefore any syntax errors will break ALL tagging on ALL our platforms (since all platforms load the same utag.js)
    -   IE5 is only compatible with ES5

## This Repo

This repo allows to edit the js code in a proper IDE like VSCode/WebStorm/IntelliJ and get benefits like syntax error highlighting, linting and code formatting. Additionally we can make PRs of sensitive changes and let them review by colleagues.

### Problems

#### 1. Template code like `##UTGEN##` and `##UTEXTEND##` causes syntax errors, breaking linting and formatting

The suggestion is to _temporally_ comment out these lines, but keep that only as a local change and **never commit the chages to these lines**. This needs support from the git tool, stage/commit either via command line, or with tools supporting to stage hunks/lines like SourceTree.

#### 2. Some very long lines like the code after "Start Tealium loader 4.32" might not be wanted to be formatted into multiple lines

The solution is similar to 1.: Comment the line out temporarily but do not commit the change to this line.
