package function

import (
	"encoding/json"
	"net/http"

	"google.golang.org/appengine"
)

// Respond - Respond
func Submit(w http.ResponseWriter, r *http.Request) {

	if HandleCors(w, r) {
		return
	}

	var rec Record

	ctx := appengine.NewContext(r)

	err := json.NewDecoder(r.Body).Decode(&rec)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	errs := rec.Validate()

	if len(errs) > 0 {
		http.Error(w, errs.Error(), http.StatusBadRequest)
		return
	}

	id, err := VerifyToken(r)

	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	rec.UserId = id

	result, err := PutRecord(rec, ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(result)
}
