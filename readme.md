## Requirements
NPM on machine
run: npm install
Selenium Webdriver (installed with NPM)
Selenium Chrome browser driver (included in git - chromedriver.exe)

## Task Scheduler
Can be set up with Windows task scheduler - run-on.bat & run-off.bat included
Create new Windows Tasks (for each bat file) with following settings:
# Action: 
"Start a program"
# Program/script: 
"path_to_bat_file\run-on.bat"
# Start in:
path_to_repository (likely the same as path_to_bat_file if not moved)