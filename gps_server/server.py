import select
import socket
from time import sleep
#import pymysql
from binascii import hexlify
import fcntl
import struct

HOST = "localhost"
PORT = 3306
USER = "root"
PASSWORD = ""
DB = "test"

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
  #conn = pymysql.connect(host = HOST, port = PORT, user = USER, password = PASSWORD, db = DB)
  #cursor = conn.cursor()
  while True:
    readable = select.select(socks, outputs, socks)[0]
    for s in readable:
      if s is sockfd:
        connection = s.accept()[0]
        socks.append(connection)
      else:
        data = s.recv(1024)
        data = bytes.decode(data)
        if data != '':
          pass
          add = parse(data)
          #sql = "UPDATE `test`.`test` SET `lat` = add[0], `lon` = add[1] WHERE (`id` = add[2])"
          #cursor.execute(sql)
          # update mysql
        else:
          socks.remove(s)
          s.close()
    sleep(1)


if __name__ == '__main__':
  run_server()