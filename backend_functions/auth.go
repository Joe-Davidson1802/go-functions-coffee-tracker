package function

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
)

type AccessDetails struct {
	sub string `json:"sub"`
}

func ExtractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	//normally Authorization the_token_xxx
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func VerifyToken(r *http.Request) (string, error) {
	tokenString := ExtractToken(r)

	var client http.Client
	resp, err := client.Get("https://oauth2.googleapis.com/tokeninfo?id_token=" + tokenString)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		var access AccessDetails
		json.NewDecoder(resp.Body).Decode(access)
		log.Println(fmt.Sprintf("User token requested, {0}", newKey.ID))
		return access.sub, nil
	}
	return "", errors.New("Non OK Response")
}
