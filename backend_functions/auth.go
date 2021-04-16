package function

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"
)

type AccessDetails struct {
	sub uint64
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

func VerifyToken(r *http.Request) (uint64, error) {
	tokenString := ExtractToken(r)

	var client http.Client
	resp, err := client.Get("https://oauth2.googleapis.com/tokeninfo?id_token=" + tokenString)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		var access AccessDetails
		json.NewDecoder(resp.Body).Decode(access)
		return access.sub, nil
	}
	return 0, errors.New("Non OK Response")
}
