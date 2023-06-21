build:
	docker build  -t app_image .

run:
	docker rm -f app_container
	docker run --restart=always -d -p 82:3000 --name app_container -i app_image

start:
	docker start app_container

stop:
	docker stop app_container
	