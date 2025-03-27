# bastion/Dockerfile
FROM ubuntu:20.04

RUN apt-get update && \
    # apt-get install -y openssh-server sudo curl && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y openssh-server net-tools iputils-ping curl &&\
    mkdir /var/run/sshd && \
    echo "root:user" | chpasswd && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
