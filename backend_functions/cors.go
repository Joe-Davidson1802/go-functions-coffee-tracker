package function

import (
	"log"
	"net/http"
)

func HandleCors(w http.ResponseWriter, r *http.Request) bool {

	if r.Method == http.MethodOptions {
		log.Println("Cors")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "3600")
		w.WriteHeader(http.StatusNoContent)
		return true
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")

	return false
}
