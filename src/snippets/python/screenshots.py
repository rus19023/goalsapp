from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

driver = webdriver.Chrome(options=options, executable_path=r'/opt/homebrew/bin/chromedriver')

sites = [
    'nintendo.com'
    ,'bonniesites.solutions'
    ,'searchforthetruth.info'
    ,'gotwick.com'
    ,'python.org'
]

for site in sites:
    site_to_get = 'https://' + site
    sitename = site
    driver.get(site_to_get)
    driver.save_screenshot(sitename + '.png')
driver.quit()

