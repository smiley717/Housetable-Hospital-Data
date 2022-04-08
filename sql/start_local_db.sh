docker run --rm -it \
 --name emo-app-postgres \
 -e POSTGRES_PASSWORD=password \
 -v "$(pwd)"/data:/var/lib/postgresql/data \
 -v "$(pwd)"/setup.sql:/docker-entrypoint-initdb.d/setup.sql \
 -p 5432:5432 \
 postgres

