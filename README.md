# emailer
1) `git clone git@github.com:martynov-dm/emailer.git`
2) `cd emailer`
3) `npm run install:all`
4) `docker-compose -f docker-compose-dev.yml up`
5) wait 1 min for kafka to start
6) open new terminal window to create topics

 
    ```
    docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
    --create \
    --bootstrap-server localhost:9092 \
    --replication-factor 1 \
    --partitions 1 \
    --topic email_process_topic
    ```

    ```
    docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
    --create \
    --bootstrap-server localhost:9092 \
    --replication-factor 1 \
    --partitions 1 \
    --topic email_trigger_topic
    ```
    
7) `npm run run:all`
8) open http://localhost:3000/

env - node.js 16.16.0 + mac m1pro + macOS 12.1
you will need python to install node rdkafka

I really tried to deploy it that's why use see Docker files, but deployment is not yet done
