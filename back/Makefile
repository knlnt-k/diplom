migrateUp:
	migrate -path ./migrations -database 'mysql://admin:admin@tcp(localhost:3306)/diplom' up
migrateDown:
	migrate -path ./migrations -database 'mysql://admin:admin@tcp(localhost:3306)/diplom' down
run back:
	go run cmd/main.go