package service

import (
	"crypto/sha1"
	"diplom/back"
	"diplom/back/pkg/repository"
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"time"
)

const (
	SALT = "askljshf123"
	SIGNING_KEY = "asdasd%#asd#ASDaajhkjglhkfjf"
	TOKEN_TTL = 12 * time.Hour
	LOG_MSG = "service > auth > "
)

type AuthService struct {
	repo repository.Authorization
}

type tokenClaims struct {
	jwt.StandardClaims
	IsCompany bool `json:"isCompany"`
	Id int64 `json:"id"`
	Access int `json:"access"`
	Name string `json:"name"`
	CompanyID int `json:"company_id"`
}

func NewAuthService(repo repository.Authorization) *AuthService {
	return &AuthService{repo: repo}
}

func (service *AuthService) CreateCompany(company back.Company) (int64, back.Error) {
	company.Password = generatePasswordHash(company.Password)

	return service.repo.CreateCompany(company)
}

func (service *AuthService) CreateUser(user back.User) (int64, back.Error) {
	user.Password = generatePasswordHash(user.Password)

	return service.repo.CreateUser(user)
}

func generatePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))

	return fmt.Sprintf("%x", hash.Sum([]byte(SALT)))
}

func (service *AuthService) GenerateTokenForCompany(login, password string) (string, back.Error) {
	company, error := service.repo.GetCompany(login, generatePasswordHash(password))
	if error.Log != "" {
		return "", error
	}

	return generateToken(company.Id, back.ACCESSES["admin"],true, company.Name, int(company.Id))
}

func (service *AuthService) GenerateTokenForUser(login, password string, companyID int) (string, back.Error) {
	user, error := service.repo.GetUser(login, generatePasswordHash(password), companyID)
	if error.Log != "" {
		return "", error
	}

	return generateToken(user.Id, user.Access,false, user.Name, user.CompanyID)
}

func generateToken(id int64, access int, isCompany bool, name string, companyID int) (string, back.Error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(TOKEN_TTL).Unix(),
			IssuedAt: time.Now().Unix(),
		},
		isCompany,
		id,
		access,
		name,
		companyID,
	})

	tokenSigned, error := token.SignedString([]byte(SIGNING_KEY))
	if error != nil {
		return "", back.Error{Log: LOG_MSG + "generateToken - " + error.Error()}
	}

	return tokenSigned, back.Error{}
}

func (service *AuthService) ParseToken(accessToken string) (*tokenClaims, back.Error) {
	token, error := jwt.ParseWithClaims(accessToken, &tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("ParseToken - invalid signing method")
		}

		return []byte(SIGNING_KEY), nil
	})
	if error != nil {
		return nil, back.Error{LOG_MSG + error.Error(), "Не валидный токен"}
	}

	claims, ok := token.Claims.(*tokenClaims)
	if !ok {
		return nil, back.Error{LOG_MSG + "token.Claims", "Вы не авторизованы"}
	}

	return claims, back.Error{}
}