FROM mysql:5.7

ENV MYSQL_DATABASE ikea
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
EXPOSE 3306
CMD ["mysqld"]