import select
import socket
from time import sleep
import pymysql
from binascii import hexlify
import fcntl
import struct

HOST = "localhost"
PORT = 3306
USER = "root"
PASSWORD = ""
DB = "test"

def get_mac(ip_address):
  return ""


def run_server():
  sockfd = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  server_address = ('localhost', 8080)
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
      else:
        data = s.recv(1024)
        if data != '':
          mac = s.getpeername()
          sql = "UPDATE `test`.`test` SET `test1` = '3' WHERE (`id` = '2')"
          cursor.execute(sql)
          # update mysql
        else:
          socks.remove(s)
          s.close()
    sleep(1)


if __name__ == '__main__':
  run_server()