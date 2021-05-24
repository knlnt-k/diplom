FROM golang:latest
WORKDIR /back
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main .
EXPOSE 8081

ENTRYPOINT go run cmd/main.go