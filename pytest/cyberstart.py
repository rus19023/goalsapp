import socket

clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.settimeout(5)  # Set a timeout of 5 seconds
clientsocket.connect(("127.0.0.1", 8082))

test = 5500
for x in range(0, 50):
    clientsocket.send(str(test).encode())
    try:
        data = clientsocket.recv(1024)
        print(data)
    except socket.timeout:
        print("Timeout occurred. Server didn't respond within the specified time.")

clientsocket.close()