package main

import (
	"diplom/back"
	"diplom/back/pkg/handler"
	"diplom/back/pkg/repository"
	"diplom/back/pkg/service"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/spf13/viper"
	"log"
	"os"
)

func main() {
	if error := initConfig(); error != nil {
		log.Fatalf("error init config - %s", error.Error())
	}

	if error := godotenv.Load(); error != nil {
		log.Fatalf("error loading env - %s", error.Error())
	}

	db, error := repository.NewMySQLDB(repository.Config{
		Host: viper.GetString("db.host"),
		Port: viper.GetString("db.port"),
		User: viper.GetString("db.user"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName: viper.GetString("db.dbname"),
	})
	if error != nil {
		log.Fatalf("error in time init DB - %s", error.Error())
	}

	repo := repository.NewRepository(db)
	services := service.NewService(repo)
	handlers := handler.NewHandler(services)
	server := new(back.Server)

	if error := server.Run(viper.GetString("port"), handlers.InitRoutes()); error != nil {
		log.Fatalf("error: %s", error.Error())
	}
}

func initConfig() error {
	viper.AddConfigPath("configs") // Config folder
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}