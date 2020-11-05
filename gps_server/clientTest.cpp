#include <netinet/in.h>
#include <arpa/inet.h>
#include <cstring>
#include <unistd.h>
#include <errno.h>
#include <stdlib.h>

char a[3] = {'1', '2', '3'};

int main(){
  int sockfd;
    sockaddr_in addr;

    sockfd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);

    memset(&addr, 0, sizeof addr);
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr.s_addr);

    connect(sockfd, reinterpret_cast<sockaddr*>(&addr), sizeof addr);
    write(sockfd, &a, sizeof a);
    close(sockfd);
    exit(0);
}