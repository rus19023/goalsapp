import requests
import os
from bs4 import BeautifulSoup

from dotenv import load_dotenv
load_dotenv()

# Login information
login_url = 'https://www.ancestry.com/account/signin'

# Create a session object to store the login cookie
session = requests.Session()

# Send a POST request with login information to the login page
login_data = {
    'email': os.getenv('IWPOWNBBNSDJWIGHJS'),
    'password': os.getenv('NWOBYSBOWEKBBKISPD'),
    'returnUrl': '',
    'rememberMe': 'true'
}
session.post(login_url, data=login_data)

# Send a GET request to the search page and parse the HTML with Beautiful Soup
search_url = 'https://www.ancestry.com/search/?name=_Lopez&birth=1925_tabasco-mexico_30702&birth_x=10-0-0&count=50&gender=m'
response = session.get(search_url)
print(response)
soup = BeautifulSoup(response.content, 'html.parser')


field = soup.select_one("div.ancCol table.tableHorizontal tbody.result-fields tr.listitem th[scope='row']").text

print(field)



# # Locate the ol element with the class "conList"
# ol_element = soup.find('ol', class_='conList')

# # Scrape all div elements with class "global-results-card" inside the ol element
# div_elements = ol_element.find_all('div', class_='global-results-card')

# # Get the text attributes of spans inside div elements with class "textWrap" and print them
# for div_element in div_elements:
#     text_wrap_spans = div_element.find_all('div', class_='textWrap')[0].find_all('span')
#     for span in text_wrap_spans:
#         print(span.text.strip())

