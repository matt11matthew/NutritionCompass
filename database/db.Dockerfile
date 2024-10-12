# Use the official MongoDB image
FROM mongo:latest

# Set MongoDB authentication variables
ENV MONGO_INITDB_ROOT_USERNAME=admin \
    MONGO_INITDB_ROOT_PASSWORD=password

# Configure MongoDB to bind to all IPs for remote access
RUN echo 'net:' > /etc/mongod.conf && \
    echo '  bindIp: 0.0.0.0' >> /etc/mongod.conf && \
    echo '  port: 27017' >> /etc/mongod.conf && \
    echo 'security:' >> /etc/mongod.conf && \
    echo '  authorization: enabled' >> /etc/mongod.conf

# Expose the MongoDB default port
EXPOSE 27017

# Use the custom config to start MongoDB
CMD ["mongod", "--config", "/etc/mongod.conf"]
