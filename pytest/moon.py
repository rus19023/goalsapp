import os.path
import sys
from defang import defang
import socket
from time import sleep

########## CYBERSTART, MOONBASE ##########

#!/usr/bin/python3


n = len(sys.argv)
print('You said the following:')
for i in range(1, n):
    print(sys.argv[i])
    

##### LEVEL 8 #####

##### LEVEL 7 #####

##### LEVEL 6 #####

##### LEVEL 5 #####

##### LEVEL 4 #####

### LEVEL 4 CHALLENGE 1 ###

#
# Ok, quick task for you agent - we've received a strange file 
# from
# the first alien communication.
# It's at /tmp/alien-signal.txt, we need you to open and read 
# the file.
#
#

with open('/tmp/alien-signal.txt') as myfile:
		print(myfile.read())
  
  
  
### LEVEL 4 CHALLENGE 2 ###

#
# Fix the below script to read from each agent file found in /tmp.
# Example agent profile would be /tmp/agent-1.txt
# The contents of each of the agent files makes up the flag
#




count = 1
code = ''
for i in range(20):
	fname = "/tmp/agent-" + str(count)+".txt"
	if os.path.isfile(fname):
		with open(fname, 'r') as content_file:
			content = content_file.read()
			code += content.rstrip()
	count += 1
print(code)


### LEVEL 4 CHALLENGE 3 ###
'''
Briefing L04 C03

Broken Robot
We have a problem. Yesterday we sent out our remote tracking robot to collect some samples, but it's got a little lost. We need it back so we can send it back out to the alien landing site if they decide to land on the moon. Can you get it back to base?

Some instructions to help you:

Import our robot module which communicates to our server and moves the robot.
The available functions are robot.right(), robot.left(), robot.up() and robot.down().
The robot can travel within a 10x10 grid of x,y positions with values 0-9. Start is S and at 0,8, finish is F and at 7,5.
The goal is to get the robot to the finishing co-ordinates without crashing or going out of bounds.
The server will respond with messages letting you know how the robot is doing after each function call.
There are also blocked coords blockedCoords (x) = [[6,5], [6,6], [6,7], [7,7], [8,7], [9,7]].
Good luck agent!

Tip: Navigate the robot back to base to get the flag.
'''

#
#  Robot Control Map
#
#  +-------------------+
# 9|                   |
# 8|S                  |
# 7|            x x x x|
# 6|            x      |
# 5|            x F    |
# 4|                   |
# 3|                   |
# 2|                   |
# 1|                   |
# 0|                   |
#  +-------------------+
#   0 1 2 3 4 5 6 7 8 9
#
#  S = Start position (0,8) F = Target destination (7,5),
#  x = Ravine, robot will be lost if hits these coords
#
# import robot module and use the robot.left(), robot.right(),
# robot.up() and robot.down() functions
#
# import robot

# robot.down(4)
# robot.right(7)
# robot.up(1)

##### LEVEL 4 CHALLENGE 3 #####



### LEVEL 4 CHALLENGE 4 ###

#
# Alien Signal API listening on http://127.0.0.1:8082
# Use HTTP GET with x-api-key header to get 
# signal
# We have narrowed down the key to be in the 
# range of 5500 to 5600
# Note: The script can timeout. If this 
# occurs try narrowing
# down your search
#

import urllib.request, urllib.error, urllib.parse

url = "http://127.0.0.1:8082"
headers = {}
n = 50
a = 5500
end = 5601
api_key_range = range(a, end)

for api_key in api_key_range:
  # print('loop engaged')
  try:
    headers = {'x-api-key': api_key}
    print(headers)    
    req = urllib.request.Request(url, headers=headers)
    response = urllib.request.urlopen(req)
    print(response.read())
  except req.exceptions.Timeout:
      print(f"Timeout for API Key: {api_key}")
  except req.exceptions.RequestException as e:
      print(f"Error for API Key {api_key}: {e}")





# DEFANG USING PYTHON

u="https://www.example.com"
defang(u, colon=True)
defang(u, all_dots=True)



##### LEVEL 3 #####


### LEVEL 3 CHALLENGE 1 ###

# Working with files is a common task for a programming language
# Python makes it easy. Let's look at an example:

myfile = open("/tmp/newfile.txt", "w")

# Our program will open a file called newfile.txt in /tmp.
# If no file exists it will be created for us.
# The "w" is the mode, in this case "w" is for write. You could use "r"
# for read.
# There are various other modes, we will cover them briefly later.

myfile.write("Here is my message.\n")
myfile.write("Here is my second message.")

# Here we write "Here is my message\n" to the file we opened. \n is a
# newline character.
# You need to add a \n every time you want to add a new line,
# otherwise everything will be on one line.

myfile.close()

# Since we opened the file, we need to close it when we're done with it.

# There are many different modes for opening a file in Python.
# Here are just a few useful ones:
# w - Allows you to write to a file only. If the file exists, it will
# be overwritten.
# r - Allows you to read the file only.
# r+ - Allows you to read and write to the file.
# w+ - Allows you to read and write to the file, but if the file
# already exists it will overwrite it.
# a - Allows you to append to the file
# (write to the end of an existing file)
# a+ - Allows you to append to the file, and read from the file.

myfile = open("/tmp/newfile.txt", "r")
filecontents = myfile.read()
print(filecontents)
myfile.close()

# Here we are reading the file we created previously.

# You can also use the 'with' syntax. It's better.
# Here is an example of reading a file line by line instead of all
# at once.

with open("/tmp/newfile.txt", "r") as myfile:
    for line in myfile:
        print(line)
print()

# The major benefit of using 'with' is that it handles closing the
# file for you.
# We used a for loop to read the file line by line.

# CHALLENGE 1: Write a for loop that will create a file called
#              /tmp/cars.txt. There should be 50 lines of text in the
#              file. The first line should be "There are 0 cars"
#              and 1 car should be added every line. Until
#              the last line which should read "There are 49 cars"

# CHALLENGE 2: Open the file at /tmp/cars.txt and read the contents.
#              Print the contents to the screen.

with open("/tmp/cars.txt", "w") as myfile:
    for x in range(0, 50):
        myfile.write("There are " + str(x) + " cars.\n")

  
with open("/tmp/cars.txt", "r") as myfile:    
    print(myfile.read())
    
 
  
  # CHALLENGE 1: Write a for loop that will create a file called
#              /tmp/cars.txt. There should be 50 lines of text in the
#              file. The first line should be "There are 0 cars"
#              and 1 car should be added every line. Until
#              the last line which should read "There are 49 cars"
with open("/tmp/cars.txt", "w") as myfile:
    for x in range(0, 50):
        myfile.write("There are " + str(x) + " cars\n")

# CHALLENGE 2: Open the file at /tmp/cars.txt and read the contents.
#              Print the contents to the screen.
with open("/tmp/cars.txt", "r") as myfile:
    print(myfile.read())

# Click "Back to my code" below to restore your code
# or
# Click "Submit code" above to get the flag

 
 
### LEVEL 3 CHALLENGE 2  ###



# Sockets are a way of sending data over a network.
# There are two main types of sockets, TCP and UDP.
# Which to use depends on the application you are communicating with.

# You will need to import the socket library first.


# To make a connection to a TCP server:

# Create a socket. AF_INET means you're connecting to an IPv4 IP
# address.
# SOCK_STREAM means you are connecting over TCP and not UDP.
clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# Tell the socket what IP address and Port number to connect to.
clientsocket.connect(('127.0.0.1', 9987))
# Send some data over the socket.
clientsocket.send('hello'.encode())
# Receive some data back. The 1024 is the max number of bytes of data
# to accept.
data = clientsocket.recv(1024)
print(data)

# You should see "You said: hello" printed out. That's because our
# server is setup to respond to whatever you send it by adding
# 'You said:' to the front of it and sending it back.

# To make a TCP Server:

# Create a socket.
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# Bind the socket to listen to a port.
serversocket.bind(("127.0.0.1", 9985))
# Tell the socket to start listening.
# The 10 is the maximum number of connections.
serversocket.listen(10)

# Setup an infinite loop so the socket will keep listening for
# incoming connections.
while True:
    # If it gets a new connection, accept it and save the connection
    # and address.
    connection, address = serversocket.accept()
    # Read 1024 bytes of data from the connection.
    data = connection.recv(1024).decode()
    # Check the length of data. If the length is more than 0 then
    # that means something was sent, so print it out.
    if len(data) > 0:
        print("Received: " + data)

    # Close the connection.
    connection.close()
    # We don't need to keep listening any more so break out of the
    # infinite loop
    break

# Close the socket.
serversocket.close()

sleep(0.05)

# CHALLENGE 1: Write a TCP Client that will connect to 127.0.0.1 on
#              port 9990.
#              Your client must send "Knock, knock" to the server.
#              Then get the response, and print it out.

clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.connect(("127.0.0.1", 9990))
clientsocket.send('Knock, knock'.encode())
data = clientsocket.recv(1024)
print(data)



### LEVEL 3 CHALLENGE 3 ###

# You aren't limited to using raw sockets to make network connections.
# Python can make HTTP requests quite easily.

# First you'll need to import the necessary urllib modules.
import urllib.request, urllib.error, urllib.parse

# Then you need to open the URL:
response = urllib.request.urlopen("http://127.0.0.1:8080")

# Now you just need to read the contents of the response:
html = response.read()
print(html)

# CHALLENGE 1: Make a connection to: 127.0.0.1:8080/winning and print the response.
response = urllib.request.urlopen("http://127.0.0.1:8080/winning")
html = response.read()
print(html)



### LEVEL 3 CHALLENGE 4 ###

 # As you know, computers only think in numbers. That means, when it comes to dealing with text, the computer has to have some way of converting numbers into letters. This is a form of encoding.

# The most common form of encoding is ASCII. In ASCII, a specific number maps to a letter. So for example, the number 65 is a capital A.

# Sometimes we need to be able to convert between the number a letter represents and the letter itself.

num = 65

# chr allows us to convert a decimal number to it's ASCII value.
char = chr(num)
# ord allows us to convert the ASCII character to it's decimal value.
dec = ord(char)

print("Character: " + char + ", Decimal: " + str(dec))

# CHALLENGE 1: Write a loop that prints the ASCII characters of all the decimal values between the range 49 and 127
for x in range(49, 128):
   print(chr(x))
   
   
   ### CHALLENGE 5 ###
   # A regular expression or regex for short is a way of searching text
# for a pattern. Most people look at regex and get scared away, and
# it does look confusing at first. But it's also an incredibly useful
# tool to add to your programming arsenal.

# First you need to import the 're' library:
import re

# In it's most basic form, you can use regex to search for words in
# some text:
pattern = "flag"
text = "The flag is: this is a fake flag: bajhdasdohaudsnasdaasd"

if re.findall(pattern, text):
    print("Found match!")

# Just telling you if something is there is not that useful though.
# Ideally we want to extract some information out of the text you are
# searching.

pattern = "flag: (.*)"
data = re.findall(pattern, text)
print(data[0])

# In this case, we managed to extract the flag from the text provided.
# Let's look more closely at how this happened.

# The key is the pattern: flag: (.*).
# First we're looking for any text that starts with 'flag: '
# Next, the brackets surround the bit we want to extract. We know the
# flag we want to get comes after, so the brackets are after 'flag: '.
# The . inside the brackets means match any character.
# The * means any number of times.
# So put it together and you're extracting any series of characters
# after the text 'flag: ' .

# What re.findall returns is an array. That's because it find all
# possible matches, so if there was more than one match, it would
# put them in the other positions in the array.
# For example data[1] for the second match, data[2] for the third
# match and so on...

# Regex is a whole language on it's own, but that is the basics.
# You can find out how to do more things with it at:
# https://regexone.com/

html = """
<html>
<head>
    <title>Regex Demo</title>
</head>
<body>
    <div class='firstDiv'>Hello</div>
    <div class='secondDiv'>Hello</div>
</body>
</html>
"""

# CHALLENGE 1: Write a regex search that extracts all the classes from
#             the divs and saves them into an array.
pattern = "class='(.*)'"
data = re.findall(pattern, html)

# CHALLENGE 2: Write a loop that goes through the array from
#              CHALLENGE 1 and prints the contents.


for x in data:
		print(x)
  
  ### LEVEL 2 ###
  
  
### CHALLENGE 1 ###

# Programs aren't always static.
# Sometimes a program has to behave differently based on the
# information it gets. We can control the flow of a program
# using conditionals.

fun = 3
hacking = 5

if fun < hacking:
    print("Not enough fun!")

# Here we have an if statement.
# It says: if the value of fun is less than the value of hacking...
#          then print "Not enough fun!"

# Did you notice that there is a tab before print in our example?
# This is called a code block.
# The ':' after hacking means the start of the code block.
# And the tab at the start of every line after that means that code
# belongs to that block.

if fun < hacking:
    print("This code belongs to the if statement...")
    print("That's because there is a tab at the beginning.")
print("This code does not belong to the if statement.")
print("It will run no matter if the statement is true or not.")

# Let's prove it...

hacking = 2
fun = 10

if fun < hacking:
    print("Fun is not less than hacking, so this line will never print.")
print("But this line does not belong to the if statement.")
print("So it will print no matter what.")

# Here are the conditional operators you should know.
# You might recognise them from Maths class.

# < - Less than
# > - Greater than
# <= - Less than or equal to
# >= - Greater than or equal to
# == - Equals To

fun = 5
hacking = 5

if fun == hacking:
    print("The value of fun is equal to the value of hacking...")

# That's not all! We can also chain if statements together.

if fun < hacking:
    print("The value of fun is less than the value of hacking...")
elif fun > hacking:
    print("The value of hacking is greater than the value of fun...")
else:
    print("The value of hacking and the value of fun are equal...")

# In the above example we can see first we check if fun is less than
# hacking.
# If it is then it runs the code in the block that belongs to it.
# If it isn't, then we go on to the next if statement.

# The next statement checks if fun is greater than hacking.
# If it is then it runs the code in the block that belongs to it.
# If it isn't then it moves on to the last statement.

# The last statement is an 'else'. That just means if it didn't match
# any of the other if statements, then run the code in the block that
# belongs to it. Note that we also combine 'else' and 'if' into 'elif'.

# In this case, if it isn't greater than or less than then it must be
# equal to, it's the only thing left.
# You can have multiple 'elif's also.

people = 5
capacity = 50

# CHALLENGE 1: Check if the number of people is lower than the capacity.
#              If it is, print "success"
#              If the number of people is higher than the capacity,
#              print "too full"
#              If the number of people is equal to the capacity,
#              print "maximum people"



# CHALLENGE 2: Set the value of the people variable to 500.
#              Then run the same check from CHALLENGE 1 again.



# CHALLENGE 3; Set the value of the people variable to 50.
#              Then run the same check from CHALLENGE 1 again.



