import select
import socket
from time import sleep
import pymysql
from binascii import hexlify
import fcntl
import struct

HOST = "pettracker.cx8vz93uf5cv.eu-west-1.rds.amazonaws.com"
PORT = 3306
USER = "orange"
PASSWORD = "asdf1234"
DB = "pettracker"

def parse(message):
  res = []
  now = ""
  for char in message:
    if char == "|":
      res.append(now)
      now = ""
      continue
    now += char
  return res


def run_server():
  sockfd = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  sockfd.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
  server_address = ('0.0.0.0', 8080)
  sockfd.bind(server_address)
  sockfd.listen(5)

  socks = [sockfd]
  outputs = []
  conn = pymysql.connect(host = HOST, port = PORT, user = USER, password = PASSWORD, db = DB)
  cursor = conn.cursor()
  while True:
    readable = select.select(socks, outputs, socks)[0]
    for s in readable:
      if s is sockfd:
        connection = s.accept()[0]
        socks.append(connection)
        print(0)
      else:
        data = s.recv(1024)
        data = bytes.decode(data)
        if data != '':
          #pass
          add = parse(data)
          print(1)
          sql = "UPDATE `device` SET `lat` = '%s', `long` = '%s' WHERE `deviceid` = '%s'" % (add[0], add[1], add[2])
          cursor.execute(sql)
          conn.commit()
          # update mysql
        else:
          print(2)
          socks.remove(s)
          s.close()
    sleep(1)


if __name__ == '__main__':
  run_server()
